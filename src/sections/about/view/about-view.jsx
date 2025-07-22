'use client';

import { AboutHero } from '../about-hero';
import { AboutWhat } from '../about-what';
import { AboutVision } from '../about-vision';
import { AboutTestimonials } from '../about-testimonials';

// ----------------------------------------------------------------------

export function AboutView() {
  return (
    <>
      <AboutHero />

      <AboutWhat />

      <AboutVision />

      <AboutTestimonials />
    </>
  );
}
