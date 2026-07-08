import { useEffect, useRef } from 'react';
import './p499-thankyou.css';
import BODY from './p499-thankyou.body.js';
import { initPage } from '../scripts/p499-thankyou.js';

export default function ThankYou499() {
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; initPage(); }, []);
  return <div dangerouslySetInnerHTML={{ __html: BODY }} />;
}
