'use client';

import {useRef} from 'react';
import { useMetaballAnimation } from '../../hooks/useMetaballAnimation';
import styles from '../../styles/components/Metaball.module.scss';

export default function MetaballCanvas ({targetSection}: { targetSection: React.RefObject<HTMLElement | null> }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useMetaballAnimation({containerRef: targetSection, canvasRef: canvasRef});

    return (
        <canvas className={`${styles['metaball-canvas']} js-metaball-canvas`} aria-hidden="true" ref={canvasRef}>
        </canvas>
    );
}