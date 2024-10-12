import { cx } from '@/lib/utils';

function IDILogo({
  className,
  title,
  ...props
}: {
  className?: string;
  title: string;
}) {
  return (
    <svg
      className={cx('text-black dark:text-white', className)}
      width='100%'
      height='100%'
      viewBox='0 0 438 129'
      xmlns='http://www.w3.org/2000/svg'
      aria-describedby='idilogo'
      {...props}
    >
      <title id='idilogo'>{title}</title>
      <path
        d='M27.923,27.928l-18.619,0l0,-18.622l18.619,0l0,18.622Zm0,-27.926l-18.618,0c-5.14,0 -9.305,4.166 -9.305,9.305l0,18.621c0,5.136 4.165,9.303 9.305,9.303l18.618,0c5.138,0 9.304,-4.167 9.304,-9.303l0,-18.621c0,-5.139 -4.166,-9.305 -9.304,-9.305'
        fill='#214ca1'
      />
      <path
        d='M18.551,10.916c-4.218,0 -7.636,3.422 -7.636,7.639c0,4.219 3.418,7.635 7.636,7.635c4.218,0 7.636,-3.416 7.636,-7.635c0,-4.217 -3.418,-7.639 -7.636,-7.639'
        fill='#214ca1'
      />
      <path
        d='M63.27,0.04l18.131,26.358l0,-20.279l-0.052,-4.824l-5.45,0l0,-1.255l11.686,0l0,1.255l-4.508,0l-0.052,4.824l0,31.388l-0.838,0.262l-24.314,-35.371l0,28.402l0.052,4.977l5.605,0l0,1.258l-12.103,0l0,-1.258l4.82,0l0.052,-4.977l0,-24.681l-0.052,-4.824l-4.82,0l0,-1.255l11.843,0Z'
        fill='currentColor'
      />
      <path
        d='M123.742,0.04l0,11.842l-1.572,0c-0.159,-1.834 -0.369,-4.139 -1.992,-6.866c-1.887,-3.194 -4.455,-3.353 -6.969,-3.457l-2.936,0l-0.051,4.716l0,24.156l0.051,5.346l5.661,0l0,1.258l-17.187,0l0,-1.258l5.658,0l0.053,-5.346l0,-24.156l-0.053,-4.716l-2.411,0c-3.039,0.052 -5.344,0.052 -7.545,3.563c-1.73,2.778 -1.886,4.978 -1.991,6.76l-1.52,0l0,-11.842l32.804,0Z'
        fill='currentColor'
      />
      <path
        d='M138.624,0.04l18.13,26.358l0,-20.279l-0.05,-4.824l-5.451,0l0,-1.255l11.684,0l0,1.255l-4.507,0l-0.053,4.824l0,31.388l-0.837,0.262l-24.315,-35.371l0,28.402l0.053,4.977l5.608,0l0,1.258l-12.106,0l0,-1.258l4.822,0l0.05,-4.977l0,-24.681l-0.05,-4.824l-4.822,0l0,-1.255l11.844,0Z'
        fill='currentColor'
      />
      <path
        d='M183.284,0.04l0,1.255l-5.191,0l-0.049,4.456l0,20.019c0.049,5.186 0.157,10.111 9.904,10.111c9.85,0 10.478,-4.297 10.636,-8.961l0,-21.169l-0.051,-4.456l-5.291,0l0,-1.255l11.576,0l0,1.255l-4.556,0l-0.052,4.456l0,19.076c-0.055,6.864 -0.107,12.732 -13.677,12.732c-1.937,0 -6.552,-0.21 -9.484,-1.415c-4.664,-1.992 -4.768,-6.077 -4.821,-11.109l0,-19.284l-0.054,-4.456l-4.506,0l0,-1.255l15.616,0Z'
        fill='currentColor'
      />
      <path
        d='M53.894,63.419l-3.008,0l0,-0.8l9.664,0l0,0.8l-3.008,0l0,21.28l3.008,0l0,0.8l-9.664,0l0,-0.8l3.008,0l0,-21.28Z'
        fill='currentColor'
      />
      <path
        d='M64.935,84.699l0,-14.08l-2.752,0l0,-0.8l6.016,0l0,3.008l0.064,0c0.49,-1.088 1.204,-1.926 2.144,-2.512c0.938,-0.587 2.069,-0.88 3.392,-0.88c1.578,0 2.757,0.352 3.536,1.056c0.778,0.704 1.168,1.856 1.168,3.456l0,10.752l2.528,0l0,0.8l-8.32,0l0,-0.8l2.528,0l0,-10.592c0,-0.448 -0.027,-0.88 -0.08,-1.296c-0.054,-0.416 -0.171,-0.79 -0.352,-1.12c-0.182,-0.331 -0.443,-0.598 -0.784,-0.8c-0.342,-0.203 -0.79,-0.304 -1.344,-0.304c-0.747,0 -1.398,0.16 -1.952,0.48c-0.555,0.32 -1.019,0.752 -1.392,1.296c-0.374,0.544 -0.656,1.162 -0.848,1.856c-0.192,0.693 -0.288,1.413 -0.288,2.16l0,8.32l2.528,0l0,0.8l-8.544,0l0,-0.8l2.752,0Z'
        fill='currentColor'
      />
      <path
        d='M93.894,74.587l-0.768,0c-0.106,-0.534 -0.24,-1.051 -0.4,-1.552c-0.16,-0.502 -0.394,-0.944 -0.704,-1.328c-0.309,-0.384 -0.698,-0.694 -1.168,-0.928c-0.469,-0.235 -1.056,-0.352 -1.76,-0.352c-0.725,0 -1.349,0.176 -1.872,0.528c-0.522,0.352 -0.784,0.912 -0.784,1.68c0,0.661 0.219,1.173 0.656,1.536c0.438,0.362 0.976,0.677 1.616,0.944c0.64,0.266 1.344,0.517 2.112,0.752c0.768,0.234 1.472,0.549 2.112,0.944c0.64,0.394 1.179,0.922 1.616,1.584c0.438,0.661 0.656,1.536 0.656,2.624c0,0.81 -0.181,1.52 -0.544,2.128c-0.362,0.608 -0.832,1.114 -1.408,1.52c-0.576,0.405 -1.226,0.709 -1.952,0.912c-0.725,0.202 -1.44,0.304 -2.144,0.304c-0.96,0 -1.888,-0.086 -2.784,-0.256c-0.896,-0.171 -1.792,-0.416 -2.688,-0.736l0,-5.216l0.96,0c0,0.746 0.096,1.445 0.288,2.096c0.192,0.65 0.475,1.221 0.848,1.712c0.374,0.492 0.843,0.88 1.408,1.168c0.566,0.288 1.243,0.432 2.032,0.432c0.406,0 0.816,-0.059 1.232,-0.176c0.416,-0.118 0.79,-0.292 1.12,-0.528c0.331,-0.235 0.603,-0.528 0.816,-0.88c0.214,-0.352 0.32,-0.763 0.32,-1.232c0,-0.704 -0.213,-1.259 -0.64,-1.664c-0.426,-0.406 -0.954,-0.758 -1.584,-1.056c-0.629,-0.299 -1.317,-0.571 -2.064,-0.816c-0.748,-0.246 -1.434,-0.55 -2.064,-0.912c-0.629,-0.363 -1.158,-0.827 -1.584,-1.392c-0.426,-0.564 -0.64,-1.307 -0.64,-2.224c0,-0.768 0.139,-1.451 0.416,-2.048c0.278,-0.596 0.65,-1.099 1.12,-1.504c0.47,-0.406 1.014,-0.71 1.632,-0.912c0.619,-0.203 1.27,-0.304 1.952,-0.304c0.854,0 1.654,0.106 2.4,0.32c0.747,0.213 1.492,0.437 2.24,0.672l0,4.16Z'
        fill='currentColor'
      />
      <path
        d='M97.222,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.117,1.664 0.352,2.112c0.234,0.448 0.682,0.672 1.344,0.672c0.618,0 1.082,-0.192 1.392,-0.576c0.309,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.843,-0.507 -1.088,-0.88c-0.246,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M110.406,64.827c0,-0.534 0.192,-0.987 0.576,-1.36c0.384,-0.374 0.832,-0.56 1.344,-0.56c0.512,0 0.96,0.186 1.344,0.56c0.384,0.373 0.576,0.826 0.576,1.36c0,0.512 -0.192,0.96 -0.576,1.344c-0.384,0.384 -0.832,0.576 -1.344,0.576c-0.512,0 -0.96,-0.192 -1.344,-0.576c-0.384,-0.384 -0.576,-0.832 -0.576,-1.344m0.288,5.792l-2.752,0l0,-0.8l6.016,0l0,14.88l2.752,0l0,0.8l-8.768,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M117.989,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.118,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.083,-0.192 1.392,-0.576c0.31,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.842,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M141.637,82.491l-0.064,0c-0.491,1.088 -1.205,1.925 -2.144,2.512c-0.939,0.586 -2.069,0.88 -3.392,0.88c-1.579,0 -2.757,-0.352 -3.536,-1.056c-0.779,-0.704 -1.168,-1.856 -1.168,-3.456l0,-10.752l-2.528,0l0,-0.8l5.792,0l0,11.392c0,0.448 0.027,0.88 0.08,1.296c0.053,0.416 0.171,0.789 0.352,1.12c0.181,0.33 0.443,0.597 0.784,0.8c0.341,0.202 0.789,0.304 1.344,0.304c0.747,0 1.397,-0.16 1.952,-0.48c0.555,-0.32 1.019,-0.752 1.392,-1.296c0.373,-0.544 0.656,-1.163 0.848,-1.856c0.192,-0.694 0.288,-1.414 0.288,-2.16l0,-8.32l-2.912,0l0,-0.8l6.176,0l0,14.88l2.752,0l0,0.8l-6.016,0l0,-3.008Z'
        fill='currentColor'
      />
      <path
        d='M148.805,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.117,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.083,-0.192 1.392,-0.576c0.309,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.843,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M159.461,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.117,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.083,-0.192 1.392,-0.576c0.309,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.843,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M179.013,70.617l0,-0.8l2.688,0l0,-3.2c0,-0.874 0.148,-1.594 0.448,-2.16c0.299,-0.564 0.688,-1.012 1.168,-1.344c0.48,-0.329 1.024,-0.56 1.632,-0.688c0.608,-0.128 1.211,-0.192 1.808,-0.192c0.469,0 0.987,0.044 1.552,0.128c0.565,0.086 1.083,0.246 1.552,0.48c0.469,0.235 0.864,0.555 1.184,0.96c0.32,0.406 0.48,0.918 0.48,1.536c0,0.427 -0.123,0.758 -0.368,0.992c-0.245,0.235 -0.581,0.352 -1.008,0.352c-1.003,0 -1.504,-0.501 -1.504,-1.504c0,-0.682 -0.128,-1.21 -0.384,-1.584c-0.256,-0.372 -0.693,-0.56 -1.312,-0.56c-0.428,0 -0.773,0.075 -1.04,0.224c-0.267,0.15 -0.469,0.368 -0.608,0.656c-0.14,0.288 -0.229,0.63 -0.272,1.024c-0.044,0.396 -0.064,0.827 -0.064,1.296l0,3.584l3.072,0l0,0.8l-3.072,0l0,14.08l2.592,0l0,0.8l-8.544,0l0,-0.8l2.688,0l0,-14.08l-2.688,0Z'
        fill='currentColor'
      />
      <path
        d='M194.437,77.659c0,0.832 0.021,1.69 0.064,2.576c0.043,0.885 0.181,1.685 0.416,2.4c0.235,0.714 0.612,1.301 1.136,1.76c0.523,0.458 1.252,0.688 2.192,0.688c0.939,0 1.664,-0.23 2.176,-0.688c0.512,-0.459 0.89,-1.046 1.136,-1.76c0.244,-0.715 0.388,-1.515 0.432,-2.4c0.042,-0.886 0.064,-1.744 0.064,-2.576c0,-0.832 -0.022,-1.691 -0.064,-2.576c-0.044,-0.886 -0.188,-1.686 -0.432,-2.4c-0.246,-0.715 -0.624,-1.302 -1.136,-1.76c-0.512,-0.459 -1.237,-0.688 -2.176,-0.688c-0.94,0 -1.669,0.229 -2.192,0.688c-0.524,0.458 -0.901,1.045 -1.136,1.76c-0.235,0.714 -0.373,1.514 -0.416,2.4c-0.043,0.885 -0.064,1.744 -0.064,2.576m-3.648,0c0,-0.811 0.121,-1.696 0.368,-2.656c0.245,-0.96 0.656,-1.851 1.232,-2.672c0.576,-0.822 1.339,-1.51 2.288,-2.064c0.949,-0.555 2.139,-0.832 3.568,-0.832c1.429,0 2.618,0.277 3.568,0.832c0.949,0.554 1.712,1.242 2.288,2.064c0.576,0.821 0.986,1.712 1.232,2.672c0.244,0.96 0.368,1.845 0.368,2.656c0,0.81 -0.124,1.696 -0.368,2.656c-0.246,0.96 -0.656,1.85 -1.232,2.672c-0.576,0.821 -1.339,1.509 -2.288,2.064c-0.95,0.554 -2.139,0.832 -3.568,0.832c-1.429,0 -2.619,-0.278 -3.568,-0.832c-0.949,-0.555 -1.712,-1.243 -2.288,-2.064c-0.576,-0.822 -0.987,-1.712 -1.232,-2.672c-0.247,-0.96 -0.368,-1.846 -0.368,-2.656'
        fill='currentColor'
      />
      <path
        d='M210.723,70.617l-2.752,0l0,-0.8l6.016,0l0,3.68l0.064,0c0.171,-0.468 0.384,-0.944 0.64,-1.424c0.256,-0.48 0.571,-0.917 0.944,-1.312c0.374,-0.393 0.795,-0.714 1.264,-0.96c0.47,-0.244 1.014,-0.368 1.632,-0.368c0.96,0 1.686,0.278 2.176,0.832c0.491,0.555 0.736,1.302 0.736,2.24c0,0.64 -0.133,1.158 -0.4,1.552c-0.266,0.395 -0.688,0.592 -1.264,0.592c-0.426,0 -0.8,-0.148 -1.12,-0.448c-0.32,-0.298 -0.48,-0.693 -0.48,-1.184c0,-0.233 0.027,-0.512 0.08,-0.832c0.054,-0.32 0.08,-0.586 0.08,-0.8c0,-0.234 -0.074,-0.426 -0.224,-0.576c-0.149,-0.149 -0.341,-0.224 -0.576,-0.224c-0.426,0 -0.848,0.208 -1.264,0.624c-0.416,0.416 -0.794,0.96 -1.136,1.632c-0.341,0.672 -0.618,1.436 -0.832,2.288c-0.213,0.854 -0.32,1.708 -0.32,2.56l0,7.008l2.656,0l0,0.8l-8.672,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M243.107,76.155c0,-1.174 -0.128,-2.134 -0.384,-2.88c-0.256,-0.747 -0.576,-1.334 -0.96,-1.76c-0.384,-0.427 -0.794,-0.715 -1.232,-0.864c-0.437,-0.15 -0.838,-0.224 -1.2,-0.224c-0.748,0 -1.356,0.186 -1.824,0.56c-0.469,0.373 -0.837,0.88 -1.104,1.52c-0.268,0.64 -0.448,1.402 -0.544,2.288c-0.096,0.885 -0.144,1.84 -0.144,2.864c0,2.304 0.278,4.085 0.832,5.344c0.555,1.258 1.482,1.888 2.784,1.888c0.81,0 1.462,-0.187 1.952,-0.56c0.491,-0.374 0.875,-0.859 1.152,-1.456c0.278,-0.598 0.459,-1.254 0.544,-1.968c0.084,-0.715 0.128,-1.424 0.128,-2.128l0,-2.624Zm-0.096,7.072l-0.064,0c-0.364,0.832 -0.94,1.482 -1.728,1.952c-0.789,0.469 -1.685,0.704 -2.688,0.704c-1.109,0 -2.06,-0.224 -2.848,-0.672c-0.789,-0.448 -1.44,-1.051 -1.952,-1.808c-0.512,-0.758 -0.885,-1.632 -1.12,-2.624c-0.234,-0.992 -0.352,-2.032 -0.352,-3.12c0,-1.472 0.154,-2.731 0.464,-3.776c0.308,-1.046 0.736,-1.894 1.28,-2.544c0.544,-0.651 1.184,-1.131 1.92,-1.44c0.736,-0.31 1.531,-0.464 2.384,-0.464c1.067,0 1.984,0.197 2.752,0.592c0.768,0.394 1.398,1.104 1.888,2.128l0.064,0l0,-8.736l-3.2,0l0,-0.8l6.464,0l0,22.08l2.624,0l0,0.8l-5.888,0l0,-2.272Z'
        fill='currentColor'
      />
      <path
        d='M257.411,77.115c-0.49,0.149 -0.896,0.314 -1.216,0.496c-0.32,0.181 -0.576,0.421 -0.768,0.72c-0.192,0.298 -0.33,0.677 -0.416,1.136c-0.085,0.458 -0.128,1.04 -0.128,1.744c0,0.49 0.027,0.96 0.08,1.408c0.054,0.448 0.155,0.837 0.304,1.168c0.148,0.33 0.363,0.597 0.64,0.8c0.278,0.202 0.63,0.304 1.056,0.304c0.704,0 1.296,-0.192 1.776,-0.576c0.48,-0.384 0.868,-0.864 1.168,-1.44c0.299,-0.576 0.512,-1.195 0.64,-1.856c0.128,-0.662 0.192,-1.268 0.192,-1.824l0,-3.072l-3.328,0.992Zm-0.192,-0.864c0.662,-0.171 1.259,-0.331 1.792,-0.48c0.534,-0.15 1.11,-0.331 1.728,-0.544l0,-1.344c0,-0.555 -0.032,-1.056 -0.096,-1.504c-0.064,-0.448 -0.186,-0.832 -0.368,-1.152c-0.181,-0.32 -0.432,-0.566 -0.752,-0.736c-0.32,-0.171 -0.748,-0.256 -1.28,-0.256c-0.81,0 -1.461,0.17 -1.952,0.512c-0.49,0.341 -0.736,1.034 -0.736,2.08c0,0.62 -0.128,1.05 -0.384,1.296c-0.256,0.245 -0.661,0.368 -1.216,0.368c-0.426,0 -0.778,-0.075 -1.056,-0.224c-0.277,-0.15 -0.416,-0.47 -0.416,-0.96c0,-0.768 0.176,-1.403 0.528,-1.904c0.352,-0.502 0.8,-0.896 1.344,-1.184c0.544,-0.288 1.152,-0.491 1.824,-0.608c0.672,-0.118 1.328,-0.176 1.968,-0.176c1.216,0 2.208,0.117 2.976,0.352c0.768,0.234 1.366,0.56 1.792,0.976c0.427,0.416 0.715,0.912 0.864,1.488c0.15,0.576 0.224,1.196 0.224,1.856l0,8.128c0,0.618 0.048,1.093 0.144,1.424c0.096,0.33 0.246,0.57 0.448,0.72c0.203,0.149 0.464,0.24 0.784,0.272c0.32,0.032 0.704,0.048 1.152,0.048l0,0.8l-2.432,0c-0.448,0 -0.858,-0.016 -1.232,-0.048c-0.373,-0.032 -0.714,-0.123 -1.024,-0.272c-0.309,-0.148 -0.57,-0.358 -0.784,-0.624c-0.213,-0.267 -0.384,-0.646 -0.512,-1.136c-0.618,0.96 -1.328,1.612 -2.128,1.952c-0.8,0.341 -1.733,0.512 -2.8,0.512c-1.664,0 -2.81,-0.406 -3.44,-1.216c-0.629,-0.811 -0.944,-1.952 -0.944,-3.424c0,-1.344 0.342,-2.358 1.024,-3.04c0.683,-0.683 1.696,-1.184 3.04,-1.504l1.92,-0.448Z'
        fill='currentColor'
      />
      <path
        d='M267.907,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.116,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.082,-0.192 1.392,-0.576c0.308,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.842,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M285.858,77.115c-0.492,0.149 -0.896,0.314 -1.216,0.496c-0.32,0.181 -0.576,0.421 -0.768,0.72c-0.192,0.298 -0.331,0.677 -0.416,1.136c-0.085,0.458 -0.128,1.04 -0.128,1.744c0,0.49 0.027,0.96 0.08,1.408c0.053,0.448 0.155,0.837 0.304,1.168c0.148,0.33 0.363,0.597 0.64,0.8c0.277,0.202 0.629,0.304 1.056,0.304c0.704,0 1.296,-0.192 1.776,-0.576c0.48,-0.384 0.868,-0.864 1.168,-1.44c0.299,-0.576 0.512,-1.195 0.64,-1.856c0.128,-0.662 0.192,-1.268 0.192,-1.824l0,-3.072l-3.328,0.992Zm-0.192,-0.864c0.661,-0.171 1.259,-0.331 1.792,-0.48c0.533,-0.15 1.109,-0.331 1.728,-0.544l0,-1.344c0,-0.555 -0.032,-1.056 -0.096,-1.504c-0.064,-0.448 -0.187,-0.832 -0.368,-1.152c-0.181,-0.32 -0.432,-0.566 -0.752,-0.736c-0.32,-0.171 -0.748,-0.256 -1.28,-0.256c-0.811,0 -1.461,0.17 -1.952,0.512c-0.491,0.341 -0.736,1.034 -0.736,2.08c0,0.62 -0.128,1.05 -0.384,1.296c-0.256,0.245 -0.661,0.368 -1.216,0.368c-0.428,0 -0.779,-0.075 -1.056,-0.224c-0.277,-0.15 -0.416,-0.47 -0.416,-0.96c0,-0.768 0.176,-1.403 0.528,-1.904c0.352,-0.502 0.8,-0.896 1.344,-1.184c0.544,-0.288 1.152,-0.491 1.824,-0.608c0.672,-0.118 1.328,-0.176 1.968,-0.176c1.216,0 2.208,0.117 2.976,0.352c0.768,0.234 1.365,0.56 1.792,0.976c0.427,0.416 0.715,0.912 0.864,1.488c0.149,0.576 0.224,1.196 0.224,1.856l0,8.128c0,0.618 0.048,1.093 0.144,1.424c0.096,0.33 0.244,0.57 0.448,0.72c0.203,0.149 0.464,0.24 0.784,0.272c0.32,0.032 0.704,0.048 1.152,0.048l0,0.8l-2.432,0c-0.448,0 -0.859,-0.016 -1.232,-0.048c-0.373,-0.032 -0.715,-0.123 -1.024,-0.272c-0.309,-0.148 -0.571,-0.358 -0.784,-0.624c-0.213,-0.267 -0.384,-0.646 -0.512,-1.136c-0.619,0.96 -1.328,1.612 -2.128,1.952c-0.8,0.341 -1.733,0.512 -2.8,0.512c-1.664,0 -2.812,-0.406 -3.44,-1.216c-0.629,-0.811 -0.944,-1.952 -0.944,-3.424c0,-1.344 0.341,-2.358 1.024,-3.04c0.681,-0.683 1.696,-1.184 3.04,-1.504l1.92,-0.448Z'
        fill='currentColor'
      />
      <path
        d='M296.354,69.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.117,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.083,-0.192 1.392,-0.576c0.309,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.843,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M318.626,75.673c0,-0.576 -0.021,-1.184 -0.064,-1.824c-0.044,-0.64 -0.176,-1.226 -0.4,-1.76c-0.224,-0.532 -0.565,-0.976 -1.024,-1.328c-0.459,-0.352 -1.093,-0.528 -1.904,-0.528c-0.683,0 -1.248,0.192 -1.696,0.576c-0.448,0.384 -0.8,0.854 -1.056,1.408c-0.256,0.555 -0.437,1.148 -0.544,1.776c-0.107,0.63 -0.16,1.19 -0.16,1.68l6.848,0Zm-6.848,0.992l0,0.256c0,1.131 0.053,2.176 0.16,3.136c0.107,0.96 0.325,1.804 0.656,2.528c0.331,0.727 0.811,1.291 1.44,1.696c0.629,0.406 1.456,0.608 2.48,0.608c0.724,0 1.364,-0.105 1.92,-0.32c0.555,-0.213 1.04,-0.501 1.456,-0.864c0.416,-0.362 0.773,-0.794 1.072,-1.296c0.299,-0.501 0.555,-1.04 0.768,-1.616l0.704,0.256c-0.341,0.939 -0.736,1.718 -1.184,2.336c-0.448,0.62 -0.96,1.11 -1.536,1.472c-0.576,0.364 -1.227,0.624 -1.952,0.784c-0.725,0.16 -1.525,0.24 -2.4,0.24c-1.195,0 -2.245,-0.218 -3.152,-0.656c-0.907,-0.437 -1.664,-1.028 -2.272,-1.776c-0.608,-0.746 -1.061,-1.616 -1.36,-2.608c-0.299,-0.992 -0.448,-2.053 -0.448,-3.184c0,-1.088 0.171,-2.128 0.512,-3.12c0.341,-0.992 0.832,-1.866 1.472,-2.624c0.64,-0.757 1.419,-1.36 2.336,-1.808c0.917,-0.448 1.963,-0.672 3.136,-0.672c1.024,0 1.957,0.176 2.8,0.528c0.843,0.352 1.568,0.848 2.176,1.488c0.608,0.64 1.077,1.403 1.408,2.288c0.331,0.886 0.496,1.862 0.496,2.928l-10.688,0Z'
        fill='currentColor'
      />
      <path
        d='M327.49,63.419l-2.496,0l0,-0.8l5.76,0l0,14.4l1.952,0l3.712,-6.4l-3.072,0l0,-0.8l6.752,0l0,0.8l-2.496,0l-3.008,4.992l6.752,9.088l1.344,0l0,0.8l-7.904,0l0,-0.8l2.496,0l-4.864,-6.88l-1.664,0l0,6.88l2.56,0l0,0.8l-8.448,0l0,-0.8l2.624,0l0,-21.28Z'
        fill='currentColor'
      />
      <path
        d='M346.466,84.699l0,-14.08l-2.752,0l0,-0.8l6.016,0l0,3.008l0.064,0c0.49,-1.088 1.205,-1.926 2.144,-2.512c0.938,-0.587 2.069,-0.88 3.392,-0.88c1.578,0 2.757,0.352 3.536,1.056c0.778,0.704 1.168,1.856 1.168,3.456l0,10.752l2.528,0l0,0.8l-8.32,0l0,-0.8l2.528,0l0,-10.592c0,-0.448 -0.027,-0.88 -0.08,-1.296c-0.054,-0.416 -0.171,-0.79 -0.352,-1.12c-0.182,-0.331 -0.443,-0.598 -0.784,-0.8c-0.342,-0.203 -0.79,-0.304 -1.344,-0.304c-0.747,0 -1.398,0.16 -1.952,0.48c-0.555,0.32 -1.019,0.752 -1.392,1.296c-0.374,0.544 -0.656,1.162 -0.848,1.856c-0.192,0.693 -0.288,1.413 -0.288,2.16l0,8.32l2.528,0l0,0.8l-8.544,0l0,-0.8l2.752,0Z'
        fill='currentColor'
      />
      <path
        d='M368.706,77.659c0,0.832 0.021,1.69 0.064,2.576c0.042,0.885 0.181,1.685 0.416,2.4c0.234,0.714 0.612,1.301 1.136,1.76c0.522,0.458 1.252,0.688 2.192,0.688c0.938,0 1.664,-0.23 2.176,-0.688c0.512,-0.459 0.89,-1.046 1.136,-1.76c0.244,-0.715 0.388,-1.515 0.432,-2.4c0.042,-0.886 0.064,-1.744 0.064,-2.576c0,-0.832 -0.022,-1.691 -0.064,-2.576c-0.044,-0.886 -0.188,-1.686 -0.432,-2.4c-0.246,-0.715 -0.624,-1.302 -1.136,-1.76c-0.512,-0.459 -1.238,-0.688 -2.176,-0.688c-0.94,0 -1.67,0.229 -2.192,0.688c-0.524,0.458 -0.902,1.045 -1.136,1.76c-0.235,0.714 -0.374,1.514 -0.416,2.4c-0.043,0.885 -0.064,1.744 -0.064,2.576m-3.648,0c0,-0.811 0.121,-1.696 0.368,-2.656c0.245,-0.96 0.656,-1.851 1.232,-2.672c0.576,-0.822 1.338,-1.51 2.288,-2.064c0.949,-0.555 2.138,-0.832 3.568,-0.832c1.429,0 2.618,0.277 3.568,0.832c0.949,0.554 1.712,1.242 2.288,2.064c0.576,0.821 0.986,1.712 1.232,2.672c0.244,0.96 0.368,1.845 0.368,2.656c0,0.81 -0.124,1.696 -0.368,2.656c-0.246,0.96 -0.656,1.85 -1.232,2.672c-0.576,0.821 -1.339,1.509 -2.288,2.064c-0.95,0.554 -2.139,0.832 -3.568,0.832c-1.43,0 -2.619,-0.278 -3.568,-0.832c-0.95,-0.555 -1.712,-1.243 -2.288,-2.064c-0.576,-0.822 -0.987,-1.712 -1.232,-2.672c-0.247,-0.96 -0.368,-1.846 -0.368,-2.656'
        fill='currentColor'
      />
      <path
        d='M382.368,62.617l6.016,0l0,22.08l2.752,0l0,0.8l-8.768,0l0,-0.8l2.752,0l0,-21.28l-2.752,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M397.184,77.659c0,0.832 0.022,1.69 0.064,2.576c0.043,0.885 0.182,1.685 0.416,2.4c0.235,0.714 0.614,1.301 1.136,1.76c0.523,0.458 1.254,0.688 2.192,0.688c0.939,0 1.664,-0.23 2.176,-0.688c0.512,-0.459 0.891,-1.046 1.136,-1.76c0.246,-0.715 0.39,-1.515 0.432,-2.4c0.043,-0.886 0.064,-1.744 0.064,-2.576c0,-0.832 -0.021,-1.691 -0.064,-2.576c-0.042,-0.886 -0.186,-1.686 -0.432,-2.4c-0.245,-0.715 -0.624,-1.302 -1.136,-1.76c-0.512,-0.459 -1.237,-0.688 -2.176,-0.688c-0.938,0 -1.669,0.229 -2.192,0.688c-0.522,0.458 -0.901,1.045 -1.136,1.76c-0.234,0.714 -0.373,1.514 -0.416,2.4c-0.042,0.885 -0.064,1.744 -0.064,2.576m-3.648,0c0,-0.811 0.123,-1.696 0.368,-2.656c0.246,-0.96 0.656,-1.851 1.232,-2.672c0.576,-0.822 1.339,-1.51 2.288,-2.064c0.95,-0.555 2.139,-0.832 3.568,-0.832c1.43,0 2.619,0.277 3.568,0.832c0.95,0.554 1.712,1.242 2.288,2.064c0.576,0.821 0.987,1.712 1.232,2.672c0.246,0.96 0.368,1.845 0.368,2.656c0,0.81 -0.122,1.696 -0.368,2.656c-0.245,0.96 -0.656,1.85 -1.232,2.672c-0.576,0.821 -1.338,1.509 -2.288,2.064c-0.949,0.554 -2.138,0.832 -3.568,0.832c-1.429,0 -2.618,-0.278 -3.568,-0.832c-0.949,-0.555 -1.712,-1.243 -2.288,-2.064c-0.576,-0.822 -0.986,-1.712 -1.232,-2.672c-0.245,-0.96 -0.368,-1.846 -0.368,-2.656'
        fill='currentColor'
      />
      <path
        d='M416.736,74.139c0,0.426 0.016,0.901 0.048,1.424c0.032,0.522 0.128,1.013 0.288,1.472c0.16,0.458 0.4,0.842 0.72,1.152c0.32,0.309 0.768,0.464 1.344,0.464c0.576,0 1.024,-0.134 1.344,-0.4c0.32,-0.267 0.566,-0.603 0.736,-1.008c0.171,-0.406 0.278,-0.848 0.32,-1.328c0.043,-0.48 0.064,-0.934 0.064,-1.36c0,-0.448 -0.016,-0.928 -0.048,-1.44c-0.032,-0.512 -0.117,-0.982 -0.256,-1.408c-0.138,-0.427 -0.368,-0.779 -0.688,-1.056c-0.32,-0.278 -0.768,-0.416 -1.344,-0.416c-0.576,0 -1.034,0.112 -1.376,0.336c-0.341,0.224 -0.597,0.517 -0.768,0.88c-0.17,0.362 -0.277,0.778 -0.32,1.248c-0.042,0.469 -0.064,0.949 -0.064,1.44m4.448,10.88c-1.13,0 -2.122,0.026 -2.976,0.08c-0.853,0.053 -1.568,0.186 -2.144,0.4c-0.576,0.213 -1.013,0.533 -1.312,0.96c-0.298,0.426 -0.448,1.013 -0.448,1.76c0,0.64 0.139,1.173 0.416,1.6c0.278,0.426 0.662,0.768 1.152,1.024c0.491,0.256 1.078,0.437 1.76,0.544c0.683,0.106 1.43,0.16 2.24,0.16c0.726,0 1.456,-0.075 2.192,-0.224c0.736,-0.15 1.392,-0.374 1.968,-0.672c0.576,-0.299 1.046,-0.672 1.408,-1.12c0.363,-0.448 0.544,-0.982 0.544,-1.6c0,-0.64 -0.101,-1.147 -0.304,-1.52c-0.202,-0.374 -0.501,-0.667 -0.896,-0.88c-0.394,-0.214 -0.896,-0.352 -1.504,-0.416c-0.608,-0.064 -1.306,-0.096 -2.096,-0.096m-6.08,-0.064c-0.981,-0.235 -1.76,-0.678 -2.336,-1.328c-0.576,-0.651 -0.864,-1.435 -0.864,-2.352c0,-0.96 0.283,-1.728 0.848,-2.304c0.566,-0.576 1.243,-1.014 2.032,-1.312c-0.426,-0.576 -0.72,-1.11 -0.88,-1.6c-0.16,-0.491 -0.24,-1.088 -0.24,-1.792c0,-0.747 0.144,-1.419 0.432,-2.016c0.288,-0.598 0.678,-1.104 1.168,-1.52c0.491,-0.416 1.051,-0.736 1.68,-0.96c0.63,-0.224 1.286,-0.336 1.968,-0.336c0.854,0 1.664,0.096 2.432,0.288c0.768,0.192 1.43,0.533 1.984,1.024c0.278,-0.363 0.603,-0.672 0.976,-0.928c0.374,-0.256 0.838,-0.384 1.392,-0.384c0.491,0 0.934,0.154 1.328,0.464c0.395,0.309 0.592,0.773 0.592,1.392c0,0.405 -0.085,0.741 -0.256,1.008c-0.17,0.266 -0.437,0.4 -0.8,0.4c-0.426,0 -0.704,-0.112 -0.832,-0.336c-0.128,-0.224 -0.213,-0.464 -0.256,-0.72c-0.042,-0.256 -0.09,-0.496 -0.144,-0.72c-0.053,-0.224 -0.218,-0.336 -0.496,-0.336c-0.192,0 -0.389,0.112 -0.592,0.336c-0.202,0.224 -0.325,0.432 -0.368,0.624c0.278,0.448 0.48,0.89 0.608,1.328c0.128,0.437 0.192,0.922 0.192,1.456c0,0.789 -0.138,1.498 -0.416,2.128c-0.277,0.629 -0.661,1.168 -1.152,1.616c-0.49,0.448 -1.066,0.789 -1.728,1.024c-0.661,0.234 -1.376,0.352 -2.144,0.352c-1.344,0 -2.581,-0.331 -3.712,-0.992c-0.234,0.021 -0.485,0.085 -0.752,0.192c-0.266,0.106 -0.512,0.25 -0.736,0.432c-0.224,0.181 -0.41,0.389 -0.56,0.624c-0.149,0.234 -0.224,0.49 -0.224,0.768c0,0.597 0.24,0.981 0.72,1.152c0.48,0.17 1.168,0.256 2.064,0.256c0.939,0 1.862,-0.022 2.768,-0.064c0.907,-0.043 1.84,-0.064 2.8,-0.064c0.832,0 1.59,0.085 2.272,0.256c0.683,0.17 1.264,0.453 1.744,0.848c0.48,0.394 0.854,0.912 1.12,1.552c0.267,0.64 0.4,1.429 0.4,2.368c0,1.109 -0.224,2.032 -0.672,2.768c-0.448,0.736 -1.034,1.328 -1.76,1.776c-0.725,0.448 -1.546,0.762 -2.464,0.944c-0.917,0.181 -1.834,0.272 -2.752,0.272c-0.682,0 -1.456,-0.059 -2.32,-0.176c-0.864,-0.118 -1.68,-0.336 -2.448,-0.656c-0.768,-0.32 -1.413,-0.774 -1.936,-1.36c-0.522,-0.587 -0.784,-1.35 -0.784,-2.288c0,-0.47 0.091,-0.88 0.272,-1.232c0.182,-0.352 0.416,-0.651 0.704,-0.896c0.288,-0.246 0.619,-0.448 0.992,-0.608c0.374,-0.16 0.752,-0.272 1.136,-0.336l0,-0.032Z'
        fill='currentColor'
      />
      <path
        d='M431.68,64.827c0,-0.534 0.192,-0.987 0.576,-1.36c0.384,-0.374 0.832,-0.56 1.344,-0.56c0.512,0 0.96,0.186 1.344,0.56c0.384,0.373 0.576,0.826 0.576,1.36c0,0.512 -0.192,0.96 -0.576,1.344c-0.384,0.384 -0.832,0.576 -1.344,0.576c-0.512,0 -0.96,-0.192 -1.344,-0.576c-0.384,-0.384 -0.576,-0.832 -0.576,-1.344m0.288,5.792l-2.752,0l0,-0.8l6.016,0l0,14.88l2.752,0l0,0.8l-8.768,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M55.175,113.659c0,0.832 0.021,1.69 0.064,2.576c0.043,0.885 0.181,1.685 0.416,2.4c0.235,0.714 0.612,1.301 1.136,1.76c0.523,0.458 1.252,0.688 2.192,0.688c0.939,0 1.664,-0.23 2.176,-0.688c0.512,-0.459 0.891,-1.046 1.136,-1.76c0.244,-0.715 0.388,-1.515 0.432,-2.4c0.043,-0.886 0.064,-1.744 0.064,-2.576c0,-0.832 -0.021,-1.691 -0.064,-2.576c-0.044,-0.886 -0.188,-1.686 -0.432,-2.4c-0.245,-0.715 -0.624,-1.302 -1.136,-1.76c-0.512,-0.459 -1.237,-0.688 -2.176,-0.688c-0.94,0 -1.669,0.229 -2.192,0.688c-0.524,0.458 -0.901,1.045 -1.136,1.76c-0.235,0.714 -0.373,1.514 -0.416,2.4c-0.043,0.885 -0.064,1.744 -0.064,2.576m-3.648,0c0,-0.811 0.121,-1.696 0.368,-2.656c0.245,-0.96 0.656,-1.851 1.232,-2.672c0.576,-0.822 1.339,-1.51 2.288,-2.064c0.949,-0.555 2.139,-0.832 3.568,-0.832c1.429,0 2.619,0.277 3.568,0.832c0.949,0.554 1.712,1.242 2.288,2.064c0.576,0.821 0.987,1.712 1.232,2.672c0.244,0.96 0.368,1.845 0.368,2.656c0,0.81 -0.124,1.696 -0.368,2.656c-0.245,0.96 -0.656,1.85 -1.232,2.672c-0.576,0.821 -1.339,1.509 -2.288,2.064c-0.949,0.554 -2.139,0.832 -3.568,0.832c-1.429,0 -2.619,-0.278 -3.568,-0.832c-0.949,-0.555 -1.712,-1.243 -2.288,-2.064c-0.576,-0.822 -0.987,-1.712 -1.232,-2.672c-0.247,-0.96 -0.368,-1.846 -0.368,-2.656'
        fill='currentColor'
      />
      <path
        d='M74.726,110.139c0,0.426 0.016,0.901 0.048,1.424c0.032,0.522 0.128,1.013 0.288,1.472c0.16,0.458 0.4,0.842 0.72,1.152c0.32,0.309 0.768,0.464 1.344,0.464c0.576,0 1.024,-0.134 1.344,-0.4c0.32,-0.267 0.566,-0.603 0.736,-1.008c0.171,-0.406 0.278,-0.848 0.32,-1.328c0.043,-0.48 0.064,-0.934 0.064,-1.36c0,-0.448 -0.016,-0.928 -0.048,-1.44c-0.032,-0.512 -0.117,-0.982 -0.256,-1.408c-0.138,-0.427 -0.368,-0.779 -0.688,-1.056c-0.32,-0.278 -0.768,-0.416 -1.344,-0.416c-0.576,0 -1.034,0.112 -1.376,0.336c-0.341,0.224 -0.597,0.517 -0.768,0.88c-0.17,0.362 -0.277,0.778 -0.32,1.248c-0.042,0.469 -0.064,0.949 -0.064,1.44m4.448,10.88c-1.13,0 -2.122,0.026 -2.976,0.08c-0.853,0.053 -1.568,0.186 -2.144,0.4c-0.576,0.213 -1.013,0.533 -1.312,0.96c-0.298,0.426 -0.448,1.013 -0.448,1.76c0,0.64 0.139,1.173 0.416,1.6c0.278,0.426 0.662,0.768 1.152,1.024c0.491,0.256 1.078,0.437 1.76,0.544c0.683,0.106 1.43,0.16 2.24,0.16c0.726,0 1.456,-0.075 2.192,-0.224c0.736,-0.15 1.392,-0.374 1.968,-0.672c0.576,-0.299 1.046,-0.672 1.408,-1.12c0.363,-0.448 0.544,-0.982 0.544,-1.6c0,-0.64 -0.101,-1.147 -0.304,-1.52c-0.202,-0.374 -0.501,-0.667 -0.896,-0.88c-0.394,-0.214 -0.896,-0.352 -1.504,-0.416c-0.608,-0.064 -1.306,-0.096 -2.096,-0.096m-6.08,-0.064c-0.981,-0.235 -1.76,-0.678 -2.336,-1.328c-0.576,-0.651 -0.864,-1.435 -0.864,-2.352c0,-0.96 0.283,-1.728 0.848,-2.304c0.566,-0.576 1.243,-1.014 2.032,-1.312c-0.426,-0.576 -0.72,-1.11 -0.88,-1.6c-0.16,-0.491 -0.24,-1.088 -0.24,-1.792c0,-0.747 0.144,-1.419 0.432,-2.016c0.288,-0.598 0.678,-1.104 1.168,-1.52c0.491,-0.416 1.051,-0.736 1.68,-0.96c0.63,-0.224 1.286,-0.336 1.968,-0.336c0.852,0 1.664,0.096 2.432,0.288c0.768,0.192 1.43,0.533 1.984,1.024c0.278,-0.363 0.603,-0.672 0.976,-0.928c0.374,-0.256 0.838,-0.384 1.392,-0.384c0.491,0 0.934,0.154 1.328,0.464c0.395,0.309 0.592,0.773 0.592,1.392c0,0.405 -0.085,0.741 -0.256,1.008c-0.17,0.266 -0.437,0.4 -0.8,0.4c-0.426,0 -0.704,-0.112 -0.832,-0.336c-0.128,-0.224 -0.213,-0.464 -0.256,-0.72c-0.042,-0.256 -0.09,-0.496 -0.144,-0.72c-0.053,-0.224 -0.218,-0.336 -0.496,-0.336c-0.192,0 -0.389,0.112 -0.592,0.336c-0.202,0.224 -0.325,0.432 -0.368,0.624c0.278,0.448 0.48,0.89 0.608,1.328c0.128,0.437 0.192,0.922 0.192,1.456c0,0.789 -0.138,1.498 -0.416,2.128c-0.277,0.629 -0.661,1.168 -1.152,1.616c-0.49,0.448 -1.066,0.789 -1.728,1.024c-0.661,0.234 -1.376,0.352 -2.144,0.352c-1.344,0 -2.581,-0.331 -3.712,-0.992c-0.234,0.021 -0.485,0.085 -0.752,0.192c-0.266,0.106 -0.512,0.25 -0.736,0.432c-0.224,0.181 -0.41,0.389 -0.56,0.624c-0.149,0.234 -0.224,0.49 -0.224,0.768c0,0.597 0.24,0.981 0.72,1.152c0.48,0.17 1.168,0.256 2.064,0.256c0.939,0 1.862,-0.022 2.768,-0.064c0.907,-0.043 1.84,-0.064 2.8,-0.064c0.832,0 1.59,0.085 2.272,0.256c0.683,0.17 1.264,0.453 1.744,0.848c0.48,0.394 0.854,0.912 1.12,1.552c0.267,0.64 0.4,1.429 0.4,2.368c0,1.109 -0.224,2.032 -0.672,2.768c-0.448,0.736 -1.034,1.328 -1.76,1.776c-0.725,0.448 -1.546,0.762 -2.464,0.944c-0.917,0.181 -1.836,0.272 -2.752,0.272c-0.682,0 -1.456,-0.059 -2.32,-0.176c-0.864,-0.118 -1.68,-0.336 -2.448,-0.656c-0.768,-0.32 -1.413,-0.774 -1.936,-1.36c-0.522,-0.587 -0.784,-1.35 -0.784,-2.288c0,-0.47 0.091,-0.88 0.272,-1.232c0.182,-0.352 0.416,-0.651 0.704,-0.896c0.288,-0.246 0.619,-0.448 0.992,-0.608c0.374,-0.16 0.752,-0.272 1.136,-0.336l0,-0.032Z'
        fill='currentColor'
      />
      <path
        d='M98.566,100.827c0,-0.534 0.192,-0.987 0.576,-1.36c0.384,-0.374 0.832,-0.56 1.344,-0.56c0.512,0 0.96,0.186 1.344,0.56c0.384,0.373 0.576,0.826 0.576,1.36c0,0.512 -0.192,0.96 -0.576,1.344c-0.384,0.384 -0.832,0.576 -1.344,0.576c-0.512,0 -0.96,-0.192 -1.344,-0.576c-0.384,-0.384 -0.576,-0.832 -0.576,-1.344m0.288,5.792l-2.752,0l0,-0.8l6.016,0l0,14.88l2.752,0l0,0.8l-8.768,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M108.838,120.699l0,-14.08l-2.752,0l0,-0.8l6.016,0l0,3.008l0.064,0c0.49,-1.088 1.205,-1.926 2.144,-2.512c0.938,-0.587 2.069,-0.88 3.392,-0.88c1.578,0 2.757,0.352 3.536,1.056c0.778,0.704 1.168,1.856 1.168,3.456l0,10.752l2.528,0l0,0.8l-8.32,0l0,-0.8l2.528,0l0,-10.592c0,-0.448 -0.027,-0.88 -0.08,-1.296c-0.054,-0.416 -0.171,-0.79 -0.352,-1.12c-0.182,-0.331 -0.443,-0.598 -0.784,-0.8c-0.342,-0.203 -0.79,-0.304 -1.344,-0.304c-0.747,0 -1.398,0.16 -1.952,0.48c-0.555,0.32 -1.019,0.752 -1.392,1.296c-0.374,0.544 -0.656,1.162 -0.848,1.856c-0.192,0.693 -0.288,1.413 -0.288,2.16l0,8.32l2.528,0l0,0.8l-8.544,0l0,-0.8l2.752,0Z'
        fill='currentColor'
      />
      <path
        d='M126.31,106.617l0,-0.8l2.688,0l0,-3.2c0,-0.874 0.148,-1.594 0.448,-2.16c0.298,-0.564 0.688,-1.012 1.168,-1.344c0.48,-0.329 1.024,-0.56 1.632,-0.688c0.608,-0.128 1.21,-0.192 1.808,-0.192c0.469,0 0.986,0.044 1.552,0.128c0.565,0.086 1.082,0.246 1.552,0.48c0.469,0.235 0.864,0.555 1.184,0.96c0.32,0.406 0.48,0.918 0.48,1.536c0,0.427 -0.123,0.758 -0.368,0.992c-0.246,0.235 -0.582,0.352 -1.008,0.352c-1.003,0 -1.504,-0.501 -1.504,-1.504c0,-0.682 -0.128,-1.21 -0.384,-1.584c-0.256,-0.372 -0.694,-0.56 -1.312,-0.56c-0.428,0 -0.774,0.075 -1.04,0.224c-0.267,0.15 -0.47,0.368 -0.608,0.656c-0.14,0.288 -0.231,0.63 -0.272,1.024c-0.044,0.396 -0.064,0.827 -0.064,1.296l0,3.584l3.072,0l0,0.8l-3.072,0l0,14.08l2.592,0l0,0.8l-8.544,0l0,-0.8l2.688,0l0,-14.08l-2.688,0Z'
        fill='currentColor'
      />
      <path
        d='M141.733,113.659c0,0.832 0.021,1.69 0.064,2.576c0.043,0.885 0.181,1.685 0.416,2.4c0.235,0.714 0.612,1.301 1.136,1.76c0.523,0.458 1.252,0.688 2.192,0.688c0.939,0 1.664,-0.23 2.176,-0.688c0.512,-0.459 0.891,-1.046 1.136,-1.76c0.244,-0.715 0.388,-1.515 0.432,-2.4c0.043,-0.886 0.064,-1.744 0.064,-2.576c0,-0.832 -0.021,-1.691 -0.064,-2.576c-0.044,-0.886 -0.188,-1.686 -0.432,-2.4c-0.245,-0.715 -0.624,-1.302 -1.136,-1.76c-0.512,-0.459 -1.237,-0.688 -2.176,-0.688c-0.94,0 -1.669,0.229 -2.192,0.688c-0.524,0.458 -0.901,1.045 -1.136,1.76c-0.235,0.714 -0.373,1.514 -0.416,2.4c-0.043,0.885 -0.064,1.744 -0.064,2.576m-3.648,0c0,-0.811 0.121,-1.696 0.368,-2.656c0.245,-0.96 0.656,-1.851 1.232,-2.672c0.576,-0.822 1.339,-1.51 2.288,-2.064c0.949,-0.555 2.139,-0.832 3.568,-0.832c1.429,0 2.619,0.277 3.568,0.832c0.949,0.554 1.712,1.242 2.288,2.064c0.576,0.821 0.987,1.712 1.232,2.672c0.244,0.96 0.368,1.845 0.368,2.656c0,0.81 -0.124,1.696 -0.368,2.656c-0.245,0.96 -0.656,1.85 -1.232,2.672c-0.576,0.821 -1.339,1.509 -2.288,2.064c-0.949,0.554 -2.139,0.832 -3.568,0.832c-1.429,0 -2.619,-0.278 -3.568,-0.832c-0.949,-0.555 -1.712,-1.243 -2.288,-2.064c-0.576,-0.822 -0.987,-1.712 -1.232,-2.672c-0.247,-0.96 -0.368,-1.846 -0.368,-2.656'
        fill='currentColor'
      />
      <path
        d='M158.021,106.617l-2.752,0l0,-0.8l6.016,0l0,3.68l0.064,0c0.171,-0.468 0.384,-0.944 0.64,-1.424c0.256,-0.48 0.571,-0.917 0.944,-1.312c0.373,-0.393 0.795,-0.714 1.264,-0.96c0.469,-0.244 1.013,-0.368 1.632,-0.368c0.96,0 1.685,0.278 2.176,0.832c0.491,0.555 0.736,1.302 0.736,2.24c0,0.64 -0.133,1.158 -0.4,1.552c-0.267,0.395 -0.688,0.592 -1.264,0.592c-0.427,0 -0.8,-0.148 -1.12,-0.448c-0.32,-0.298 -0.48,-0.693 -0.48,-1.184c0,-0.233 0.027,-0.512 0.08,-0.832c0.053,-0.32 0.08,-0.586 0.08,-0.8c0,-0.234 -0.075,-0.426 -0.224,-0.576c-0.149,-0.149 -0.341,-0.224 -0.576,-0.224c-0.427,0 -0.848,0.208 -1.264,0.624c-0.416,0.416 -0.795,0.96 -1.136,1.632c-0.341,0.672 -0.619,1.436 -0.832,2.288c-0.213,0.854 -0.32,1.708 -0.32,2.56l0,7.008l2.656,0l0,0.8l-8.672,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M182.405,110.107c0,-0.448 -0.028,-0.88 -0.08,-1.296c-0.055,-0.416 -0.171,-0.79 -0.352,-1.12c-0.181,-0.331 -0.443,-0.598 -0.784,-0.8c-0.341,-0.203 -0.8,-0.304 -1.376,-0.304c-0.704,0 -1.324,0.16 -1.856,0.48c-0.533,0.32 -0.988,0.752 -1.36,1.296c-0.373,0.544 -0.652,1.162 -0.832,1.856c-0.181,0.693 -0.272,1.413 -0.272,2.16l0,8.32l2.528,0l0,0.8l-8.544,0l0,-0.8l2.752,0l0,-14.08l-2.752,0l0,-0.8l6.016,0l0,3.008l0.064,0c0.489,-1.088 1.205,-1.926 2.144,-2.512c0.939,-0.587 2.068,-0.88 3.392,-0.88c1.301,0 2.345,0.293 3.136,0.88c0.788,0.586 1.248,1.488 1.376,2.704l0.064,0c0.468,-1.216 1.205,-2.118 2.208,-2.704c1.001,-0.587 2.091,-0.88 3.264,-0.88c1.579,0 2.757,0.352 3.536,1.056c0.779,0.704 1.168,1.856 1.168,3.456l0,10.752l2.528,0l0,0.8l-8.32,0l0,-0.8l2.528,0l0,-10.592c0,-0.448 -0.028,-0.88 -0.08,-1.296c-0.053,-0.416 -0.165,-0.79 -0.336,-1.12c-0.172,-0.331 -0.416,-0.598 -0.736,-0.8c-0.32,-0.203 -0.736,-0.304 -1.248,-0.304c-0.748,0 -1.404,0.17 -1.968,0.512c-0.565,0.341 -1.035,0.794 -1.408,1.36c-0.373,0.565 -0.656,1.205 -0.848,1.92c-0.192,0.714 -0.288,1.445 -0.288,2.192l0,8.128l2.528,0l0,0.8l-8.32,0l0,-0.8l2.528,0l0,-10.592Z'
        fill='currentColor'
      />
      <path
        d='M207.043,113.115c-0.49,0.149 -0.896,0.314 -1.216,0.496c-0.32,0.181 -0.576,0.421 -0.768,0.72c-0.192,0.298 -0.33,0.677 -0.416,1.136c-0.085,0.458 -0.128,1.04 -0.128,1.744c0,0.49 0.027,0.96 0.08,1.408c0.054,0.448 0.155,0.837 0.304,1.168c0.148,0.33 0.363,0.597 0.64,0.8c0.278,0.202 0.63,0.304 1.056,0.304c0.704,0 1.296,-0.192 1.776,-0.576c0.48,-0.384 0.868,-0.864 1.168,-1.44c0.299,-0.576 0.512,-1.195 0.64,-1.856c0.128,-0.662 0.192,-1.268 0.192,-1.824l0,-3.072l-3.328,0.992Zm-0.192,-0.864c0.662,-0.171 1.259,-0.331 1.792,-0.48c0.534,-0.15 1.11,-0.331 1.728,-0.544l0,-1.344c0,-0.555 -0.032,-1.056 -0.096,-1.504c-0.064,-0.448 -0.186,-0.832 -0.368,-1.152c-0.181,-0.32 -0.432,-0.566 -0.752,-0.736c-0.32,-0.171 -0.748,-0.256 -1.28,-0.256c-0.81,0 -1.461,0.17 -1.952,0.512c-0.49,0.341 -0.736,1.034 -0.736,2.08c0,0.62 -0.128,1.05 -0.384,1.296c-0.256,0.245 -0.661,0.368 -1.216,0.368c-0.426,0 -0.778,-0.075 -1.056,-0.224c-0.277,-0.15 -0.416,-0.47 -0.416,-0.96c0,-0.768 0.176,-1.403 0.528,-1.904c0.352,-0.502 0.8,-0.896 1.344,-1.184c0.544,-0.288 1.152,-0.491 1.824,-0.608c0.672,-0.118 1.328,-0.176 1.968,-0.176c1.216,0 2.208,0.117 2.976,0.352c0.768,0.234 1.366,0.56 1.792,0.976c0.427,0.416 0.715,0.912 0.864,1.488c0.15,0.576 0.224,1.196 0.224,1.856l0,8.128c0,0.618 0.048,1.093 0.144,1.424c0.096,0.33 0.246,0.57 0.448,0.72c0.203,0.149 0.464,0.24 0.784,0.272c0.32,0.032 0.704,0.048 1.152,0.048l0,0.8l-2.432,0c-0.448,0 -0.858,-0.016 -1.232,-0.048c-0.373,-0.032 -0.714,-0.123 -1.024,-0.272c-0.309,-0.148 -0.57,-0.358 -0.784,-0.624c-0.213,-0.267 -0.384,-0.646 -0.512,-1.136c-0.618,0.96 -1.328,1.612 -2.128,1.952c-0.8,0.341 -1.733,0.512 -2.8,0.512c-1.664,0 -2.81,-0.406 -3.44,-1.216c-0.629,-0.811 -0.944,-1.952 -0.944,-3.424c0,-1.344 0.342,-2.358 1.024,-3.04c0.683,-0.683 1.696,-1.184 3.04,-1.504l1.92,-0.448Z'
        fill='currentColor'
      />
      <path
        d='M217.539,105.819l2.208,0l0,-4.256l3.264,0l0,4.256l3.552,0l0,0.8l-3.552,0l0,11.328c0,0.96 0.116,1.664 0.352,2.112c0.235,0.448 0.683,0.672 1.344,0.672c0.619,0 1.082,-0.192 1.392,-0.576c0.308,-0.384 0.592,-0.832 0.848,-1.344l0.736,0.32l-0.288,0.576c-0.32,0.576 -0.784,1.082 -1.392,1.52c-0.608,0.436 -1.488,0.656 -2.64,0.656c-0.832,0 -1.488,-0.108 -1.968,-0.32c-0.48,-0.214 -0.842,-0.507 -1.088,-0.88c-0.245,-0.374 -0.4,-0.795 -0.464,-1.264c-0.064,-0.47 -0.096,-0.96 -0.096,-1.472l0,-11.328l-2.208,0l0,-0.8Z'
        fill='currentColor'
      />
      <path
        d='M230.723,100.827c0,-0.534 0.192,-0.987 0.576,-1.36c0.384,-0.374 0.832,-0.56 1.344,-0.56c0.512,0 0.96,0.186 1.344,0.56c0.384,0.373 0.576,0.826 0.576,1.36c0,0.512 -0.192,0.96 -0.576,1.344c-0.384,0.384 -0.832,0.576 -1.344,0.576c-0.512,0 -0.96,-0.192 -1.344,-0.576c-0.384,-0.384 -0.576,-0.832 -0.576,-1.344m0.288,5.792l-2.752,0l0,-0.8l6.016,0l0,14.88l2.752,0l0,0.8l-8.768,0l0,-0.8l2.752,0l0,-14.08Z'
        fill='currentColor'
      />
      <path
        d='M240.995,99.419l-2.496,0l0,-0.8l5.76,0l0,14.4l1.952,0l3.712,-6.4l-3.072,0l0,-0.8l6.752,0l0,0.8l-2.496,0l-3.008,4.992l6.752,9.088l1.344,0l0,0.8l-7.904,0l0,-0.8l2.496,0l-4.864,-6.88l-1.664,0l0,6.88l2.56,0l0,0.8l-8.448,0l0,-0.8l2.624,0l0,-21.28Z'
        fill='currentColor'
      />
      <path
        d='M259.97,99.419l-2.496,0l0,-0.8l5.76,0l0,14.4l1.952,0l3.712,-6.4l-3.072,0l0,-0.8l6.752,0l0,0.8l-2.496,0l-3.008,4.992l6.752,9.088l1.344,0l0,0.8l-7.904,0l0,-0.8l2.496,0l-4.864,-6.88l-1.664,0l0,6.88l2.56,0l0,0.8l-8.448,0l0,-0.8l2.624,0l0,-21.28Z'
        fill='currentColor'
      />
    </svg>
  );
}

export { IDILogo };
