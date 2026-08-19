export type HamburgerProps = {
  isOpen: boolean,
  toggleMenu: () => void
}

export default function HamburgerMenu({isOpen, toggleMenu}: HamburgerProps) {

  return (
    <button
      onClick={toggleMenu}
      aria-label={isOpen ? "Stäng meny" : "Öppna meny"}
      className="z-900 fixed top-sm left-sm w-[51px] h-[51px] focus:outline-none transition-transform active:scale-95"
    >
      <svg
        width="51"
        height="51"
        viewBox="0 0 51 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-1000 ease-in-out"
        style={{
          transform: isOpen ? "" : "",
        }}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes kf_Line_1_path-trim_0 {
            0% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 0 1; visibility: hidden; }
            15% { stroke-dasharray: 1 1; visibility: visible; }
            100% { stroke-dasharray: 1 1; visibility: visible; }
          }
          #Line_1 { stroke-dashoffset: 0; animation: kf_Line_1_path-trim_0 2s linear ; }
          
          @keyframes kf_Line_2_path-trim_0 {
            0% { stroke-dasharray: 0 1; visibility: hidden; }
            5% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 0 1; visibility: hidden; }
            20% { stroke-dasharray: 1 1; visibility: visible; }
            100% { stroke-dasharray: 1 1; visibility: visible; }
          }
          #Line_2 { stroke-dashoffset: 0; animation: kf_Line_2_path-trim_0 2s linear ; }
          
          @keyframes kf_Line_3_path-trim_0 {
            0% { stroke-dasharray: 0 1; visibility: hidden; }
            10% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 0 1; visibility: hidden; }
            25% { stroke-dasharray: 1 1; visibility: visible; }
            100% { stroke-dasharray: 1 1; visibility: visible; }
          }
          #Line_3 { stroke-dashoffset: 0; animation: kf_Line_3_path-trim_0 2s linear ; }
          
          @keyframes kf_Line_1_2_opacity_0 {
            0% { animation-timing-function: linear; opacity: 1; }
            11.61% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); opacity: 1; }
            11.65% { animation-timing-function: linear; opacity: 0; }
            100% { opacity: 0; }
          }
          #Line_1_2 { animation: kf_Line_1_2_opacity_0 2s linear ; }
          
          @keyframes kf_Line_2_2_opacity_0 {
            0% { animation-timing-function: linear; opacity: 1; }
            7.73% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); opacity: 1; }
            7.77% { animation-timing-function: linear; opacity: 0; }
            14.95% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); opacity: 0; }
            15% { animation-timing-function: linear; opacity: 1; }
            100% { opacity: 1; }
          }
          @keyframes kf_Line_2_2_path-trim_0 {
            0% { stroke-dasharray: 1 1; visibility: visible; }
            11.649% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 1 1; visibility: visible; }
            14.95% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 0 1; visibility: hidden; }
            34.375% { stroke-dasharray: 1 1; visibility: visible; }
            100% { stroke-dasharray: 1 1; visibility: visible; }
          }
          #Open_line_2 { stroke-dashoffset: 0; animation: kf_Line_2_2_opacity_0 2s linear infinite, kf_Line_2_2_path-trim_0 2s linear ; }
          
          @keyframes kf_Line_3_2_path-trim_0 {
            0% { stroke-dasharray: 1 1; }
            11.766% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 1 1; }
            14.95% { animation-timing-function: cubic-bezier(0.5, 0, 0.5, 1); stroke-dasharray: 0.0103 1; }
            35% { stroke-dasharray: 1 1; }
            100% { stroke-dasharray: 1 1; }
          }
          #Open_line_3 { stroke-dashoffset: 0; animation: kf_Line_3_2_path-trim_0 2s linear ; }
        ` }} />
        
        <g id="HamburgerMenu">
          <g id="Closed">
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_1" 
              x1="35.5" 
              y1="15.5" 
              x2="14.5" 
              y2="15.5" 
              pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_2" x1="35.5" y1="25.5" x2="14.5" y2="25.5" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_3" x1="35.5" y1="35.5" x2="14.5" y2="35.5" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
          </g>
          <g id="Closing">
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_1" 
              x1="35.5" 
              y1="15.5" 
              x2="14.5" 
              y2="15.5" 
              pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_2" x1="35.5" y1="25.5" x2="14.5" y2="25.5" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
            <line 
              className={!isOpen ? "block" : "hidden"}
              id="Line_3" x1="35.5" y1="35.5" x2="14.5" y2="35.5" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
          </g>

          <g id="Open">
            <line 
              className={isOpen ? "block" : "hidden"} 
              id="Line_1" x1="13.915" y1="14.2154" x2="36.8818" y2="37.0056" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
            <line 
              className={isOpen ? "block" : "hidden"} 
              id="Line_2" x1="37.354" y1="14.1212" x2="14.1212"   y2="36.8801" pathLength="1" stroke="#1A1A1A" strokeWidth="3" strokeLinecap="round" strokeDasharray="1 1"
            />
          </g>
        </g>
      </svg>
    </button>
  )
}