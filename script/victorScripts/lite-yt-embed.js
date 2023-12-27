/**
 * A lightweight youtube embed. Still should feel the same to the user, just MUCH faster to initialize and paint.
 *
 * Thx to these as the inspiration
 *   https://storage.googleapis.com/amp-vs-non-amp/youtube-lazy.html
 *   https://autoplay-youtube-player.glitch.me/
 *
 * Once built it, I also found these:
 *   https://github.com/ampproject/amphtml/blob/master/extensions/amp-youtube (👍👍)
 *   https://github.com/Daugilas/lazyYT
 *   https://github.com/vb/lazyframe
 */
function runFirstPartOfCode() {
    class LiteYTEmbed extends HTMLElement {
        constructor() {
            super();
            this.hasFetchedVideoInfo = false;
        }
        connectedCallback() {
            this.videoId = this.getAttribute('videoid');

            let playBtnEl = this.querySelector('.lty-playbtn');
            // A label for the button takes priority over a [playlabel] attribute on the custom-element
            this.playLabel = (playBtnEl && playBtnEl.textContent.trim()) || this.getAttribute('playlabel') || 'Play';

            /**
             * Lo, the youtube placeholder image!  (aka the thumbnail, poster image, etc)
             *
             * See https://github.com/paulirish/lite-youtube-embed/blob/master/youtube-thumbnail-urls.md
             *
             * TODO: Do the sddefault->hqdefault fallback
             *       - When doing this, apply referrerpolicy (https://github.com/ampproject/amphtml/pull/3940)
             * TODO: Consider using webp if supported, falling back to jpg
             */
            if (!this.style.backgroundImage) {
            this.style.backgroundImage = `url("https://i.ytimg.com/vi/${this.videoId}/maxresdefault.jpg")`;
            }
            // Set up channel image
            const existingChaNameAndVideoTitle = this.querySelector('.chaNameAndVideoTitle');                
            if (!existingChaNameAndVideoTitle) {
                var chaNameAndVideoTitle = document.createElement('div');
                chaNameAndVideoTitle.classList.add('chaNameAndVideoTitle');
                var channelImg = document.createElement('div');
                channelImg.classList.add('lty-channelimg');
                chaNameAndVideoTitle.prepend(channelImg);
                this.append(chaNameAndVideoTitle);
            }
            // Set up video title
            const videoURL = `https://www.youtube.com/watch?v=${this.videoId}`;
            const oEmbedURL = `https://www.youtube.com/oembed?url=${videoURL}`;
            if (!this.hasFetchedVideoInfo) {
                fetch(oEmbedURL)
                .then(response => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error("Failed to retrieve video information.");
                    }
                })
                .then(data => {
                    const videoBox = this.parentElement.parentElement;
                    // Check if a .video-title element already exists
                    const existingVideoTitle = videoBox.querySelector('.video-title');                
                    if (!existingVideoTitle) {
                        // If it doesn't exist, create a new h3.video-title element
                        const videoTitleSeen = document.createElement('h3');
                        videoTitleSeen.classList.add('video-title');
                        videoTitleSeen.append(data.title);
                        videoBox.append(videoTitleSeen);
                    }
                    // Function to strip HTML tags from a string
                    function stripHtmlTags(html) {
                        const doc = new DOMParser().parseFromString(html, 'text/html');
                        return doc.body.textContent || "";
                    }
                    // Create a set to track processed video boxes
                    const processedVideoBoxes = new Set();
                    var videoTitleElement;
                    var modifiedText;
                    var VideoDateElement;
                    // Get all video-box elements
                    const videoBoxElements = document.querySelectorAll('.video-box');
                    // Loop through each video-box element
                    videoBoxElements.forEach(function (videoBoxElement) {
                        // Check if the modification has already been done
                        if (!processedVideoBoxes.has(videoBoxElement)) {
                            // Get the video title element within the current video-box
                            videoTitleElement = videoBoxElement.querySelector('.video-title');
                            // Extract the date from the video title
                            const videoTitleText = videoTitleElement.textContent;
                            // Regular expression for the first date format: "23rd Dec. 2023"
                            const firstDateFormatMatch = videoTitleText.match(/(\d{1,2}(?:st|nd|rd|th)?)\s?(\w{3})\.\s?(\d{4})\.?/);
                            // Regular expression for the second date format: "Sun, Dec 24, 2023."
                            const secondDateFormatMatch = videoTitleText.match(/(?:\w{3},\s)?(\w{3})\s(\d{1,2}),\s(\d{4})\.?/);
                            // Check if a date match is found
                            if (firstDateFormatMatch && firstDateFormatMatch.length > 0) {
                                const [dayMatch, monthMatch, yearMatch] = firstDateFormatMatch.slice(1);
                                const day = dayMatch || '';
                                const month = monthMatch || '';
                                const year = yearMatch || '';
                                // Manually construct the date string in a format recognized by the Date constructor
                                const dateString = `${month} ${day.replace(/\D/g, '')}, ${year}`;
                                const dateObject = new Date(dateString);
                                // Check if the dateObject is valid
                                if (!isNaN(dateObject)) {
                                    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObject);
                                    // Create a span element
                                    VideoDateElement = document.createElement('span');
                                    VideoDateElement.classList.add('video-date');
                                    VideoDateElement.textContent = dayOfWeek + ', ' + dateString + '.';
                                    // Create a new text node with the modified text (excluding the date)
                                    modifiedText = document.createTextNode(videoTitleText.replace(firstDateFormatMatch[0], ''));
                                    videoTitleElement.innerHTML = '';
                                    // Append the modified text and the span element to the video title
                                    videoTitleElement.appendChild(modifiedText);
                                    videoTitleElement.appendChild(VideoDateElement);                                    
                                    // Add the modified video title content (without HTML tags) as a new attribute
                                    videoBoxElement.setAttribute('video-title', stripHtmlTags(videoTitleElement.innerHTML));
                                    // Add the date as an attribute to the current video-box
                                    videoBoxElement.setAttribute('date-posted', dayOfWeek + ', ' + dateString);
                                    processedVideoBoxes.add(videoBoxElement);
                                } else {
                                    console.error('Invalid date object:', dateObject);
                                }
                            } else if (secondDateFormatMatch && secondDateFormatMatch.length > 0) {
                                const [, monthMatch, dayMatch, yearMatch] = secondDateFormatMatch;
                                const day = dayMatch || '';
                                const month = monthMatch || '';
                                const year = yearMatch || '';
                                const dateString = `${month} ${day}, ${year}`;
                                const dateObject = new Date(dateString);
                                // Check if the dateObject is valid
                                if (!isNaN(dateObject)) {
                                    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(dateObject);
                                    // Create a span element
                                    const VideoDateElement = document.createElement('span');
                                    VideoDateElement.classList.add('video-date');
                                    VideoDateElement.textContent = dayOfWeek + ', ' + dateString + '.';
                                    // Create a new text node with the modified text (excluding the date)
                                    modifiedText = document.createTextNode(videoTitleText.replace(secondDateFormatMatch[0], ''));
                                    videoTitleElement.innerHTML = '';
                                    // Append the modified text and the span element to the video title
                                    videoTitleElement.appendChild(modifiedText);
                                    videoTitleElement.appendChild(VideoDateElement);
                                    // Add the modified video title content (without HTML tags) as a new attribute
                                    videoBoxElement.setAttribute('video-title', stripHtmlTags(videoTitleElement.innerHTML));
                                    // Add the date as an attribute to the current video-box
                                    videoBoxElement.setAttribute('date-posted', dayOfWeek + ', ' + dateString);
                                    processedVideoBoxes.add(videoBoxElement);
                                } else {
                                    console.error('Invalid date object:', dateObject);
                                }
                            } else {
                                // No match for either format
                                console.error('No date match found');
                            }
                        }
                    });
                    this.hasFetchedVideoInfo = true;
                })
                .catch(error => {
                    console.error(error);
                });
            }
            // //This is used by the search engine
            // const videoBoxElements = document.querySelectorAll('.video-box');
            // videoBoxElements.forEach((videoBox) => {
            //     const chaNameAndVideoTitleElement = videoBox.querySelector('.chaNameAndVideoTitle');
            //     const videoTitleElement = videoBox.querySelector('.video-title'); // Select the first element with class '.video-title'
            //     if (videoTitleElement) {
            //         // Check if createDivElement has already been created for this videoBox
            //         let createDivElement = chaNameAndVideoTitleElement.querySelector('.moving-text');       
            //         // If not, create a new div for each videoBox
            //         if (!createDivElement) {
            //             createDivElement = document.createElement('div');
            //             createDivElement.classList.add('moving-text');
            //             // Copy the content of videoTitleElement into createDivElement
            //             createDivElement.innerHTML = videoTitleElement.innerHTML;
            //             // Append the createDivElement to chaNameAndVideoTitleElement
            //             chaNameAndVideoTitleElement.append(createDivElement);
            //         }
            //     }
            // });
            // Set up play button, and its visually hidden label
            if (!playBtnEl) {
                playBtnEl = document.createElement('button');
                playBtnEl.type = 'button';
                playBtnEl.classList.add('lty-playbtn');
                this.append(playBtnEl);
            }
            if (!playBtnEl.textContent) {
                const playBtnLabelEl = document.createElement('span');
                playBtnLabelEl.className = 'lyt-visually-hidden';
                playBtnLabelEl.textContent = this.playLabel;
                playBtnEl.append(playBtnLabelEl);
            }
            playBtnEl.removeAttribute('href');

            // On hover (or tap), warm up the TCP connections we're (likely) about to use.
            this.addEventListener('pointerover', LiteYTEmbed.warmConnections, {once: true});

            // Once the user clicks, add the real iframe and drop our play button
            // TODO: In the future we could be like amp-youtube and silently swap in the iframe during idle time
            //   We'd want to only do this for in-viewport or near-viewport ones: https://github.com/ampproject/amphtml/pull/5003
            this.addEventListener('click', this.addIframe);

            // Chrome & Edge desktop have no problem with the basic YouTube Embed with ?autoplay=1
            // However Safari desktop and most/all mobile browsers do not successfully track the user gesture of clicking through the creation/loading of the iframe,
            // so they don't autoplay automatically. Instead we must load an additional 2 sequential JS files (1KB + 165KB) (un-br) for the YT Player API
            // TODO: Try loading the the YT API in parallel with our iframe and then attaching/playing it. #82
            this.needsYTApiForAutoplay = navigator.vendor.includes('Apple') || navigator.userAgent.includes('Mobi');
        }

        /**
         * Add a <link rel={preload | preconnect} ...> to the head
         */
        static addPrefetch(kind, url, as) {
            const linkEl = document.createElement('link');
            linkEl.rel = kind;
            linkEl.href = url;
            if (as) {
                linkEl.as = as;
            }
            document.head.append(linkEl);
        }

        /**
         * Begin pre-connecting to warm up the iframe load
         * Since the embed's network requests load within its iframe,
         *   preload/prefetch'ing them outside the iframe will only cause double-downloads.
         * So, the best we can do is warm up a few connections to origins that are in the critical path.
         *
         * Maybe `<link rel=preload as=document>` would work, but it's unsupported: http://crbug.com/593267
         * But TBH, I don't think it'll happen soon with Site Isolation and split caches adding serious complexity.
         */
        static warmConnections() {
            if (LiteYTEmbed.preconnected) return;

            // The iframe document and most of its subresources come right off youtube.com
            LiteYTEmbed.addPrefetch('preconnect', 'https://www.youtube-nocookie.com');
            // The botguard script is fetched off from google.com
            LiteYTEmbed.addPrefetch('preconnect', 'https://www.google.com');

            // Not certain if these ad related domains are in the critical path. Could verify with domain-specific throttling.
            LiteYTEmbed.addPrefetch('preconnect', 'https://googleads.g.doubleclick.net');
            LiteYTEmbed.addPrefetch('preconnect', 'https://static.doubleclick.net');

            LiteYTEmbed.preconnected = true;
        }

        fetchYTPlayerApi() {
            if (window.YT || (window.YT && window.YT.Player)) return;

            this.ytApiPromise = new Promise((res, rej) => {
                var el = document.createElement('script');
                el.src = 'https://www.youtube.com/iframe_api';
                el.async = true;
                el.onload = _ => {
                    YT.ready(res);
                };
                el.onerror = rej;
                this.append(el);
            });
        }

        async addYTPlayerIframe(params) {
            this.fetchYTPlayerApi();
            await this.ytApiPromise;

            const videoPlaceholderEl = document.createElement('div')
            this.append(videoPlaceholderEl);

            const paramsObj = Object.fromEntries(params.entries());

            new YT.Player(videoPlaceholderEl, {
                width: '100%',
                videoId: this.videoId,
                playerVars: paramsObj,
                events: {
                    'onReady': event => {
                        event.target.playVideo();
                    }
                }
            });
        }

        async addIframe(){
            if (this.classList.contains('lyt-activated')) return;
            this.classList.add('lyt-activated');

            const params = new URLSearchParams(this.getAttribute('params') || []);
            params.append('autoplay', '1');
            params.append('playsinline', '1');

            if (this.needsYTApiForAutoplay) {
                return this.addYTPlayerIframe(params);
            }

            const iframeEl = document.createElement('iframe');
            iframeEl.width = 560;
            iframeEl.height = 315;
            // No encoding necessary as [title] is safe. https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html#:~:text=Safe%20HTML%20Attributes%20include
            iframeEl.title = this.playLabel;
            iframeEl.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
            iframeEl.allowFullscreen = true;
            // AFAIK, the encoding here isn't necessary for XSS, but we'll do it only because this is a URL
            // https://stackoverflow.com/q/64959723/89484
            iframeEl.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(this.videoId)}?${params.toString()}`;
            this.append(iframeEl);

            // Set focus for a11y
            iframeEl.focus();
        }
    }
    // Register custom element
    customElements.define('lite-youtube', LiteYTEmbed);
}