function AnimatedCoffeeScannerSVG({
  className,
  ...props
}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      className={className}
      width='100%'
      height='100%'
      viewBox='0 0 520 330'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      aria-hidden='true'
      {...props}
    >
      <g id='rfid_card_svg'>
        <g id='rfid-scanner'>
          <g id='scanner'>
            <rect
              id='top-face'
              y='2.5'
              width='145'
              height='145'
              transform='matrix(0.866025 0.5 -0.866025 0.5 132.069 1.25)'
              fill='black'
              stroke='white'
              strokeWidth='5'
            />
            <rect
              id='left-face'
              x='3.2476'
              y='5.625'
              width='142.5'
              height='7.5'
              transform='matrix(0.866025 0.5 0 1 0.435095 73.3762)'
              stroke='white'
              strokeWidth='7.5'
            />
            <rect
              id='right-face'
              x='3.2476'
              y='1.875'
              width='142.5'
              height='7.5'
              transform='matrix(0.866025 -0.5 0 1 130.339 151.624)'
              stroke='white'
              strokeWidth='7.5'
            />
          </g>
          <g id='rfid'>
            <g id='rfid-inner'>
              <path
                d='M89.5179 75.4045C89.4786 81.3155 93.364 87.2335 101.175 91.7434C109.128 96.335 119.609 98.5757 130.032 98.469V102.005C118.042 102.112 105.994 99.5254 96.8453 94.2434C87.8379 89.043 83.3545 82.22 83.394 75.4041L89.5179 75.4045Z'
                fill='white'
              />
              <path
                d='M129.723 48.9792C141.343 49.0376 152.931 51.6247 161.797 56.7434C170.805 61.9438 175.286 68.7668 175.247 75.5828H169.124C169.163 69.6717 165.279 63.7534 157.467 59.2434C149.797 54.8151 139.775 52.5736 129.723 52.5154V48.9792Z'
                fill='white'
              />
            </g>
            <g id='rfid-middle'>
              <path
                d='M129.723 40.1414C145.549 40.0725 161.413 43.5217 173.489 50.4934C185.485 57.4197 191.462 66.5048 191.422 75.5828H185.297C185.337 67.4096 179.959 59.2293 169.158 52.9934C158.279 46.712 143.982 43.6086 129.723 43.6775V40.1414Z'
                fill='#D9D9D9'
              />
              <path
                d='M75.0754 75.4041C75.0359 83.5772 80.4152 91.7575 91.2161 97.9934C101.938 104.184 115.979 107.289 130.032 107.312V110.848C114.412 110.825 98.8037 107.374 86.886 100.493C74.8893 93.5671 68.9112 84.482 68.9507 75.4041H75.0754Z'
                fill='#D9D9D9'
              />
            </g>
            <g id='rid-outer'>
              <path
                d='M58.8992 75.4045C58.8599 85.8396 65.7347 96.2817 79.5248 104.243C93.4564 112.287 111.773 116.255 130.032 116.15V119.685C110.206 119.79 90.322 115.477 75.1947 106.743C60.2089 98.0914 52.7352 86.7444 52.7744 75.4045H58.8992Z'
                fill='#D9D9D9'
              />
              <path
                d='M129.723 31.3005C149.179 31.3591 168.603 35.6729 183.448 44.2434C198.434 52.8955 205.906 64.2424 205.866 75.5823H199.742C199.781 65.1472 192.908 54.7051 179.118 46.7434C165.469 38.8633 147.612 34.8952 129.723 34.8367V31.3005Z'
                fill='#D9D9D9'
              />
            </g>
          </g>
        </g>
        <g id='card' className='animate-rfid-card'>
          <rect
            id='kort'
            width='90'
            height='140'
            rx='10'
            transform='matrix(0.866025 -0.5 0.866025 0.5 51.8443 70.1018)'
            fill='#000000'
            stroke='white'
            strokeWidth='3'
            strokeLinejoin='round'
          />
          <g id='student'>
            <g id='student-hode'>
              <rect
                x='1.73205'
                width='28'
                height='28'
                rx='14'
                transform='matrix(0.866025 -0.5 0.866025 0.5 115.296 77.4678)'
                stroke='white'
                strokeWidth='2'
              />
              <path
                id='Vector 1'
                d='M140.395 81.9768C147.015 80.9363 149.18 79.665 150.355 76.2268'
                stroke='white'
                strokeWidth='2'
              />
              <ellipse
                id='Ellipse 2'
                cx='2'
                cy='2.5'
                rx='2'
                ry='2.5'
                transform='matrix(0.866025 -0.5 0.866025 0.5 138.447 73.1018)'
                fill='white'
              />
              <ellipse
                id='Ellipse 3'
                cx='2'
                cy='2.5'
                rx='2'
                ry='2.5'
                transform='matrix(0.866025 -0.5 0.866025 0.5 131.519 77.1018)'
                fill='white'
              />
            </g>
            <path
              id='Ellipse 4'
              d='M153.169 83.6018C164.358 77.1419 182.322 76.9797 193.853 83.113L152.323 107.091C141.699 100.433 141.98 90.0617 153.169 83.6018Z'
              stroke='white'
              strokeWidth='2'
            />
          </g>
        </g>
      </g>
    </svg>
  );
}

export { AnimatedCoffeeScannerSVG };
