import { useEffect, useRef } from "react";
import Drift from "drift-zoom";

const Demo = ({ img, zoomImage}) => {
  const demoTriggerRef = useRef(null);
  const paneContainerRef = useRef(null);

  useEffect(() => {
    const demoTrigger = demoTriggerRef.current;
    const paneContainer = paneContainerRef.current;

    new Drift(demoTrigger, {
      paneContainer: paneContainer,
      inlinePane: false,
    });
  }, []);

  return (
    <div>
      <style>
        {`
          .demo-area{
            background:$color_invert_fg;
            border-radius:8px;
            margin-left: 10px;
            padding:40px;
            section{
              padding-top:0;
            }
          }
          
          .demo-trigger {
           
           
         
      
          }
          
          
          .detail {
            position: absolute;
          
            top: 0;
            right: 0;
            margin-top:50px;
            margin-right:200px;
            width: 32%;
            height:530px;
          
            
            float: left;
            button{
              vertical-align:middle;
              opacity:.5;
              cursor:unset;
              background:$color_invert_chrome_tint;
              margin-left:1em;
            }
          }
          .demo-area:hover .detail {
            opacity: 1;
            transform: translateY(-10px);
          }
          
          @media (max-width: 510px) {
          
          
          
            .demo-trigger {
              display:block;
              width: 96%;
              margin-right: px;
        
           
            }
          
            .detail {
              margin: 0;
              width: auto;
            }
          
            p {
              margin: 0 auto 1em;
            }
          
            .responsive-hint {
              display: none;
            }
            h3 {
              margin-top:20px;
            }
          }
        `}
      </style>
      <section className="content">
        <article className="demo-area">
          <img
            className="demo-trigger"
            src={img}
            data-zoom={zoomImage}
            ref={demoTriggerRef}
          />
          <div className="">
          <div className="detail" ref={paneContainerRef}></div>
          </div>
        </article>
      </section>
    </div>
  );
};

export default Demo;
