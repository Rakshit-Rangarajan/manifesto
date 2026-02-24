"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, ShieldCheck, Users, Zap } from "lucide-react";

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

const AnimatedCounter = ({
  target,
  suffix = "",
  prefix = "",
  duration = 2000,
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);

      if (current !== start) {
        setCount(current);
        start = current;
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
};

const stats = [
  {
    icon: Briefcase,
    value: 2,
    suffix: "+",
    label: "Years Experience",
    description: "Full-stack development",
  },
  {
    icon: ShieldCheck,
    value: 50,
    suffix: "+",
    label: "Vulnerabilities Fixed",
    description: "100% compliance score",
  },
  {
    icon: Users,
    value: 15,
    suffix: "",
    label: "Engineers Trained",
    description: "On GitHub Copilot & AI",
  },
  {
    icon: Zap,
    value: 80,
    suffix: "%",
    label: "Faster Reports",
    description: "Through automation",
  },
];

const Stats = () => {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card border border-border rounded-xl p-5 sm:p-6 text-center card-hover group"
            >
              <div className="inline-flex p-2.5 rounded-lg bg-primary/10 text-primary mb-3 sm:mb-4 group-hover:bg-primary/20 transition-colors">
                <stat.icon size={20} />
              </div>
              <div className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-sm font-semibold text-foreground mb-0.5">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
