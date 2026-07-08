import { useEffect, useRef } from 'react';
import './p499-landing.css';
import BODY from './p499-landing.body.js';
import { initPage } from '../scripts/p499-landing.js';

export default function Landing499() {
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; initPage(); }, []);
  return <div dangerouslySetInnerHTML={{ __html: BODY }} />;
}
