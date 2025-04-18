'use client';

import MapPrimitive, {
  type MapProps,
  NavigationControl,
} from 'react-map-gl/maplibre';

import { useTheme } from 'next-themes';

interface BaseMapProps extends Omit<MapProps, 'mapStyle'> {
  children?: React.ReactNode;
}

function BaseMap({ children, ...props }: BaseMapProps) {
  const { resolvedTheme } = useTheme();

  const mapStyle =
    resolvedTheme === 'dark'
      ? 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
      : 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  return (
    <MapPrimitive
      mapStyle={mapStyle}
      style={{
        width: '100%',
        borderRadius: 'var(--radius-md)',
        height: '100%',
      }}
      {...props}
    >
      <NavigationControl position='bottom-right' />
      {children}
    </MapPrimitive>
  );
}

export { BaseMap };
