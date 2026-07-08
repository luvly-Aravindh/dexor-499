import { useEffect, useRef } from 'react';
import './p499-thankyou.css';
import BODY from './p499-thankyou.body.js';
import { initPage } from '../scripts/p499-thankyou.js';

export default function ThankYou499() {
  const ran = useRef(false);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    if (typeof window !== 'undefined' && !document.getElementById('meta-pixel-script')) {
      const pixelScript = document.createElement('script');
      pixelScript.id = 'meta-pixel-script';
      pixelScript.textContent = `
        !function(f,b,e,v,n,t,s)
        {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js');
        fbq('init', '2317309995432074');
        fbq('track', 'PageView');
      `;
      document.head.appendChild(pixelScript);

      const noscript = document.createElement('noscript');
      noscript.innerHTML = `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=2317309995432074&ev=PageView&noscript=1" />`;
      document.body.appendChild(noscript);
    }

    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'Lead');
    }

    initPage();
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: BODY }} />;
}
