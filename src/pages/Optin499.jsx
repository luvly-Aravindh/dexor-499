import { useEffect, useRef } from 'react';
import './p499-optin.css';
import BODY from './p499-optin.body.js';
import { initPage } from '../scripts/p499-optin.js';

export default function Optin499() {
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; initPage(); }, []);
  return <div dangerouslySetInnerHTML={{ __html: BODY }} />;
}
