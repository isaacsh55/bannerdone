import Autoplay from 'embla-carousel-autoplay';
import Box from '@mui/material/Box';
import { Carousel, useCarousel, CarouselDotButtons } from 'src/components/carousel';


export function HomeHero({ data }) {
  const carousel = useCarousel({ loop: true }, [Autoplay({ playOnInit: true, delay: 5000 })]);
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: { xs: 100, sm: 100, md: 100 }, // or '100vh' for fullscreen
        overflow: 'hidden',
      }}
    >
      <Carousel carousel={carousel}>
        {data.map((item) => (
          <CarouselItem key={item.id} item={item} />
        ))}
      </Carousel>

      <CarouselDotButtons
        scrollSnaps={carousel.dots.scrollSnaps}
        selectedIndex={carousel.dots.selectedIndex}
        onClickDot={carousel.dots.onClickDot}
        sx={{
          top: 16,
          right: 16,
          position: 'absolute',
          color: 'common.white',
        }}
      />
    </Box>
  )
}

function CarouselItem({ item }) {
  return (
    <Box
      sx={{
        width: '100%',
        height: { xs: 300, md: '100%' }, // adjust as needed
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      <Box
        component="img"
        alt={item.title}
        src={item.coverUrl}
        sx={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: { xs: 'center', md: '' },
        }}
      />
    </Box>
  );
}
