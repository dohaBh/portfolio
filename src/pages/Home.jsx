import { Link } from "react-router-dom";
import {
  ArrowRight,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { featuredProjects } from "../data/projects";

const Home =() => {
  return (
    <div className="min-h-screen bg-black">

      <section className="min-h-[90vh] flex items-center justify-center px-6 bg-black">
        <div className="max-w-6xl mx-auto w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">

            <div className="text-center md:text-left">

              <div className="hover:bg-amber-50 inline-block mb-8 px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-full">
                <span className="text-lg md:text-xl font-semibold tracking-wide">AVAILABLE FOR PFA INTERNSHIP</span>
              </div>


              <h1 className="text-5xl md:text-6xl font-bold mb-6 text-white leading-tight">
                Bouchikhi Doha
              </h1>


              <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                Passionate developer creating
                <span className="text-amber-600 font-medium"> Elegant & Efficient</span> digital experiences
              </p>


              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start mb-12">
                <Link
                  to="/Project"
                  className="group px-8 py-3 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors duration-300 inline-flex items-center justify-center gap-2"
                >
                  View My Projects
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/about"
                  className="px-8 py-3 border border-white text-white rounded-md hover:bg-white hover:text-black transition-colors duration-300"
                >
                  About Me
                </Link>
              </div>


              <div className="flex gap-4 justify-center md:justify-start">
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-700 text-white rounded-md hover:border-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/in/doha-bouchikhi-8220a2263"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 border border-gray-700 text-white rounded-md hover:border-amber-600 hover:bg-amber-600 transition-colors duration-300"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="mailto:bouchikhidoha2@gmail.com"
                  className="p-4 border border-gray-700 text-white rounded-md hover:border-white hover:bg-white hover:text-black transition-colors duration-300"
                >
                  <Mail size={24} />
                </a>
              </div>
            </div>


            <div className="flex justify-center md:justify-end md:-mt-16">
              <div className="relative w-80 h-80 md:w-96 md:h-96">

                <div className="absolute inset-0 border-2 border-amber-600 rounded-lg transform rotate-6"></div>
                

                <div className="relative w-full h-full rounded-lg overflow-hidden border-2 border-white bg-gray-800">
                  <img
                    src="/images/doha.jpeg"
                    alt="Doha Bouchikhi"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      <section className="py-32 px-6 bg-[#f5f0e8]">
        <div className="max-w-6xl mx-auto">

          <div className="mb-20">
            <div className="flex items-center gap-4 mb-8">
              <span className="text-xs tracking-[0.3em] text-gray-400 uppercase">Doha's</span>
              <div className="h-px flex-1 bg-gradient-to-r from-gray-200 to-transparent"></div>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-black max-w-2xl">
              Code • Design • Innovation
            </h2>
          </div>


          <div className="space-y-24">
            {featuredProjects.map((project, index) => (
              <Link
                key={project.id}
                to="/Project"
                className="group block"
              >
                <div className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-dense' : ''
                }`}>

                  <div className={`relative overflow-hidden ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={project.images[1]}
                        alt={project.title}
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                      />
                    </div>

                    <div className="absolute top-6 right-6 w-12 h-12 border border-white/50 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">0{project.id}</span>
                    </div>
                  </div>


                  <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-black group-hover:text-amber-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                      {project.idea}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.technologies.map((technologies, idx) => (
                        <span
                          key={idx}
                          className="text-xs tracking-wider text-gray-500 uppercase"
                        >
                          {technologies}
                        </span>
                      ))}
                    </div>


                    <div className="flex items-center gap-2 text-black group-hover:text-amber-600 transition-colors">
                      <span className="text-sm font-medium tracking-wide">Details </span>
                      <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>


          <div className="mt-24 text-center">
            <Link
              to="/project"
              className="inline-flex items-center gap-3 text-black hover:text-amber-600 transition-colors group"
            >
              <span className="text-sm tracking-wider uppercase font-medium">All projects</span>
              <div className="w-16 h-px bg-black group-hover:bg-amber-600 group-hover:w-24 transition-all"></div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;