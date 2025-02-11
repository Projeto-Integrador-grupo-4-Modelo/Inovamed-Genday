import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { Github, Linkedin } from "lucide-react";

function ModalKemilly() {
  return (
    <>
      <style>
        {`
                    .popup-content {
                        border-radius: 0.5rem !important;
                        padding: 0 !important;
                        border: none !important;
                        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25) !important;
                        width: 24rem !important;
                    }

                    .popup-overlay {
                        background: rgba(0, 0, 0, 0.5) !important;
                    }
                `}
      </style>
      <Popup
        trigger={
          <img
            src="https://i.imgur.com/MLVXxOe.jpg"
            alt="Team Member"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#42f8e2] cursor-pointer hover:scale-110 transition-transform duration-300"
          />
        }
        modal
      >
        <div className="bg-gray-200 rounded-lg p-6 max-w-sm mx-auto shadow-xl">
          <div className="flex flex-col items-center">
            <img
              src="https://i.imgur.com/MLVXxOe.jpg"
              alt="Team Member"
              className="w-32 h-32 rounded-full mb-6 object-cover ring-4 ring-[#42f8e2]"
            />
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Kemilly Fagundes
            </h2>
            <p className="text-gray-600 font-medium mb-4">
              Full Stack Developer
            </p>

            <p className="text-gray-600 text-center mb-6 text-sm">
              Desenvolvedora full stack Java, estudando o 4º semestre de Análise
              e Desenvolvimento de Sistemas.
            </p>

            <div className="flex space-x-4">
              <a
                href="https://github.com/Kemilly-fgnds"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-[#42f8e2] transition-colors"
              >
                <Github className="w-6 h-6 text-gray-700" />
              </a>
              <a
                href="https://www.linkedin.com/in/kemilly-fagundes-da-silva/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-100 rounded-full hover:bg-[#42f8e2] transition-colors"
              >
                <Linkedin className="w-6 h-6 text-gray-700" />
              </a>
            </div>
          </div>
        </div>
      </Popup>
    </>
  );
}

export default ModalKemilly;
