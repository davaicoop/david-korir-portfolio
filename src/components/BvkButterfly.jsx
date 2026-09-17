export default function BvkButterfly() {
  return (
    <svg className="bvk-butterfly" viewBox="0 0 500 500" role="img" aria-label="BVK butterfly botanical illustration">
      <defs>
        <linearGradient id="wingLeft" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#f6c98f"/><stop offset=".48" stopColor="#d88972"/><stop offset="1" stopColor="#9b5b76"/></linearGradient>
        <linearGradient id="wingRight" x1="1" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#f4b987"/><stop offset=".5" stopColor="#c86d75"/><stop offset="1" stopColor="#74567d"/></linearGradient>
        <linearGradient id="wingLower" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#82b6a2"/><stop offset="1" stopColor="#4c7f7a"/></linearGradient>
      </defs>
      <g className="botanical-lines"><path d="M245 470 C245 390 225 320 185 260"/><path d="M250 430 C285 360 325 315 365 280"/><ellipse cx="190" cy="320" rx="24" ry="11" transform="rotate(-35 190 320)"/><ellipse cx="215" cy="365" rx="25" ry="11" transform="rotate(25 215 365)"/><ellipse cx="310" cy="345" rx="25" ry="11" transform="rotate(-25 310 345)"/><ellipse cx="345" cy="300" rx="24" ry="11" transform="rotate(35 345 300)"/></g>
      <g className="butterfly-wings"><path className="wing-left" d="M245 225 C205 125 95 105 75 175 C55 245 145 285 235 255Z"/><path className="wing-right" d="M255 225 C295 125 405 105 425 175 C445 245 355 285 265 255Z"/><path className="wing-lower-left" d="M240 245 C175 245 125 290 155 330 C185 365 225 320 245 270Z"/><path className="wing-lower-right" d="M260 245 C325 245 375 290 345 330 C315 365 275 320 255 270Z"/></g>
      <ellipse className="butterfly-body" cx="250" cy="250" rx="9" ry="55"/><g className="butterfly-antennae"><path d="M246 205 C225 180 215 170 200 165"/><path d="M254 205 C275 180 285 170 300 165"/></g>
      <g className="wing-details"><circle cx="150" cy="185" r="9"/><circle cx="350" cy="185" r="9"/><circle cx="180" cy="220" r="5"/><circle cx="320" cy="220" r="5"/></g>
    </svg>
  );
}
