import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  stagger?: boolean;
}

export function AnimatedSection({ children, className, id, stagger = false }: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation(0.1);

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      id={id}
      className={cn(
        'section-animate',
        stagger && 'stagger-animate',
        isVisible && 'visible',
        className
      )}
    >
      {children}
    </section>
  );
}
