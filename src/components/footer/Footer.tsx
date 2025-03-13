import {
  Facebook,
  Instagram,
  Youtube,
  Github,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import React from "react";

function Footer() {
  return (
    <footer className="bg-[#0D9389] border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-9 items-center">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4">
          <img
            src="https://i.imgur.com/Xza8h0B.png"
            alt="Logo InovaMed"
            className="w-64 h-auto"
          />
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white-500 mb-8"></div>

        {/* Grid Contato e Redes Sociais */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
            {/* Contato */}
            <div className="flex flex-col items-start">
              <h3 className="text-lg font-semibold text-white mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center text-white">
                  <Phone className="h-5 w-5 mr-2" />
                  <span>(11) 9999-9999</span>
                </div>
                <div className="flex items-center text-white">
                  <Mail className="h-5 w-5 mr-2" />
                  <span>contato@InovaMed.com</span>
                </div>
                <div className="flex items-center text-white">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>São Paulo, SP</span>
                </div>
              </div>
            </div>

            {/* Redes Sociais */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-4">
                Acesse nossas redes sociais
              </h3>
              <div className="flex space-x-4">
                <a href="#" aria-label="GitHub">
                  <Github className="h-10 w-8 text-white hover:text-[#00C49A] transition-colors" />
                </a>
                <a href="#" aria-label="YouTube">
                  <Youtube className="h-10 w-8 text-white hover:text-[#00C49A] transition-colors" />
                </a>
                <a href="#" aria-label="Facebook">
                  <Facebook className="h-10 w-8 text-white hover:text-[#00C49A] transition-colors" />
                </a>
                <a href="#" aria-label="Instagram">
                  <Instagram className="h-10 w-8 text-white hover:text-[#00C49A] transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t text-center text-white">
          <p>
            &copy; Copyright 2025 InovaMed CRM. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
