import { useEffect, useRef } from 'react';
import './p499-order.css';
import BODY from './p499-order.body.js';
import { initPage } from '../scripts/p499-order.js';

export default function Order499() {
  const ran = useRef(false);
  useEffect(() => { if (ran.current) return; ran.current = true; initPage(); }, []);
  return <div dangerouslySetInnerHTML={{ __html: BODY }} />;
}
