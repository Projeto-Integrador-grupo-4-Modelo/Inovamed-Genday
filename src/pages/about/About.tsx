import {
  Heart,
  Target,
  Lightbulb,
  Users,
  Clock,
  Shield,
  Award,
  ThumbsUp,
  Stethoscope,
  Github,
  Linkedin,
  UsersRound,
  Database,
  Cpu,
  Code,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../../components/footer/Footer";

function About() {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <div
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-teal-900/70 flex items-center">
            <div className="container mx-auto px-6">
              <h1 className="text-5xl font-bold text-white mb-4">
                Sobre a Inova Med
              </h1>
              <p className="text-xl text-white">
                Criamos o InovaMed para transformar a experiência de
                agendamentos médicos. Nosso sistema garante a eficiência para
                profissionais da saúde e praticidade para os usuários.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-16">
          <section className="mb-20">
            <HeaderSection icon={Target} title="Nossa Missão" />
            <ContentBox text="Criar soluções tecnológicas inovadoras para a área da saúde, utilizando desenvolvimento ágil, código escalável e boas práticas, garantindo eficiência e acessibilidade para todos os usuários." />
          </section>

          <section className="mb-20">
            <HeaderSection icon={Heart} title="Nossos Valores" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ValueCard
                icon={Code}
                title="Código Limpo"
                description="Seguimos boas práticas para manter um código eficiente e sustentável"
              />
              <ValueCard
                icon={Cpu}
                title="Inovação"
                description="Buscamos constantemente novas tecnologias e arquiteturas"
              />
              <ValueCard
                icon={Shield}
                title="Segurança"
                description="Garantimos proteção de dados e conformidade com as melhores normas"
              />
              <ValueCard
                icon={Clock}
                title="Performance"
                description="Priorizamos eficiência e otimização para uma melhor experiência"
              />
              <ValueCard
                icon={Users}
                title="Colaboração"
                description="Trabalhamos em equipe para desenvolver soluções robustas"
              />
              <ValueCard
                icon={Database}
                title="Escalabilidade"
                description="Construímos sistemas preparados para crescer de forma sustentável"
              />
            </div>
          </section>

          <section className="mb-20">
            <HeaderSection icon={Lightbulb} title="Nossa Visão" />
            <ContentBox text="Ser referência no desenvolvimento de plataformas inteligentes para a área da saúde, focando em automação, segurança e inovação." />
          </section>

          <section className="py-20">
            <HeaderSection icon={UsersRound} title="Nossa Equipe" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <TeamCard
                name="Bianca de Jesus"
                role="Developer"
                image="https://i.imgur.com/3gH6LBw.png"
                links={[
                  {
                    url: "https://github.com/Bianncajs",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/biancajesuss/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Bruna Bosco"
                role="Tester"
                image="https://i.imgur.com/MaACJDA.png"
                links={[
                  {
                    url: "https://github.com/BrunaBosco",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/brunabosco-/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Guilherme Kaynam"
                role="Developer"
                image="https://i.imgur.com/DZxzHkp.jpg"
                links={[
                  {
                    url: "https://github.com/guilhermekaynam",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://linkedin.com/in/guilherme-kaynam",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Kemilly Fagundes"
                role="Product Owner"
                image="https://i.imgur.com/MLVXxOe.jpg"
                links={[
                  {
                    url: "https://github.com/Kemilly-fgnds",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/kemilly-fagundes-da-silva/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Rubio Dainton"
                role="Developer"
                image="https://i.imgur.com/RWr3thk.jpg"
                links={[
                  {
                    url: "https://github.com/Rubio01",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/rubiodainton/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Priscila Santos"
                role="Developer"
                image="https://i.imgur.com/boEuaDa.jpg"
                links={[
                  {
                    url: "https://github.com/Pribort",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/priscilabortniuk/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Victória Lara"
                role="Developer"
                image="https://i.imgur.com/OD4zkur.png"
                links={[
                  {
                    url: "https://github.com/victorialaraa",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/victoria-lara-do-nascimento/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
              <TeamCard
                name="Vítor Cavalcante"
                role="Developer"
                image="https://i.imgur.com/KptY0W0.png"
                links={[
                  {
                    url: "https://github.com/Vitor-C-Souza",
                    icon: <Github className="w-5 h-5" />,
                  },
                  {
                    url: "https://www.linkedin.com/in/vitorcavalcantesouza/",
                    icon: <Linkedin className="w-5 h-5" />,
                  },
                ]}
              />
            </div>
          </section>
        </div>
        <div className="text-center py-6">
          <button
            onClick={handleBackToHome}
            className="relative px-8 py-3 text-white font-semibold text-lg bg-gradient-to-r from-[#0D9488] via-[#1C74C8] to-[#0D9389] rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:brightness-110s"
          >
            Voltar para a Página Inicial
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

function HeaderSection({ icon: Icon, title }) {
  return (
    <div className="flex items-center justify-center mb-12">
      <Icon className="w-10 h-10 text-[#0D9488] mr-4" />
      <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
    </div>
  );
}

function ContentBox({ text }) {
  return (
    <div className="group bg-gradient-to-r from-[#0D9488]/10 via-[#1C74C8]/10 to-[#0D9389]/10 rounded-xl shadow-lg p-8 border border-[#0D9488]/20 transition-all duration-300 hover:scale-105 hover:border-[#0D9488] hover:shadow-xl">
      <p className="text-xl text-gray-700 text-center leading-relaxed transition-colors duration-300 group-hover:text-[#0D9389]">
        {text}
      </p>
    </div>
  );
}

function ValueCard({ icon: Icon, title, description }) {
  return (
    <div className="group bg-gradient-to-r from-[#0D9488]/10 via-[#1C74C8]/10 to-[#0D9389]/10 rounded-xl shadow-lg p-6 border border-[#0D9488]/20 transition-all duration-300 hover:scale-105 hover:border-[#0D9488] hover:shadow-xl">
      <div className="text-[#0D9488] mb-4">
        <Icon className="w-8 h-8 transition-transform duration-300 group-hover:scale-110 group-hover:text-[#0D9389]" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function TeamCard({ name, role, image, links }) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-[#0D9488]/10 via-[#1C74C8]/10 to-[#0D9389]/10 p-6 border border-[#0D9488]/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
      <div className="relative z-10 text-center">
        <div className="mb-4 h-32 w-32 mx-auto overflow-hidden rounded-full border-2 border-[#0D9488] group-hover:scale-110 transition-transform">
          <img src={image} alt={name} className="h-full w-full object-cover" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-[#0D9488] mb-4">{role}</p>
        <div className="flex justify-center space-x-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#0D9488] hover:text-[#1C74C8] transition-colors"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default About;
