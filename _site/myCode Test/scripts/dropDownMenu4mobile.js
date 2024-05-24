function toggle() {
    var n = document.getElementById("headerLinks");
  if (n.style.display != 'block') 
    {
    n.style.display = 'block';
      document.getElementById(id2).setAttribute('aria-expanded', 'false');
  }
  else
  {
  n.style.display = 'none';
  document.getElementById(id2).setAttribute('aria-expanded', 'true');
    }
  }