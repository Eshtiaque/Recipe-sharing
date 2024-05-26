import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { FaHtml5, FaCss3Alt, FaBootstrap, FaReact, FaNodeJs, FaGit,  } from 'react-icons/fa';
import { SiTailwindcss, SiJavascript, SiExpress, SiMongodb ,SiTypescript } from 'react-icons/si';
import devPhoto from '../../../assets/images/developerPhoto.jpg'


const DevInfo = () => {
    return (
        <div>
            <h2 className="text-4xl mt-8  font-serif font-extrabold text-center mb-12 text-orange-600">Developer Information</h2>
            <div className="bg-gradient-to-r from-slate-50 to-orange-100  text-black py-16 mb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                
                <div className="flex flex-col lg:flex-row items-center lg:items-start bg-white p-8 rounded-xl shadow-2xl">
                    {/* Image Section */}
                    <div className="mb-8 lg:mb-0 lg:w-1/3 flex justify-center">
                        <img
                            src={devPhoto}
                            alt="Developer"
                            className="w-48 h-48 rounded-full border-4 border-orange-600 shadow-lg transition-transform transform hover:scale-110"
                        />
                    </div>
                    
                    {/* Information Section */}
                    <div className="lg:w-2/3 text-center lg:text-left space-y-8">
                        <h3 className="text-3xl font-semibold text-black">Eshtiaque Ahmed</h3>
                        <hr  className='border-black border-1'/>
                        
                        {/* Educational Background */}
                        <div className="p-6 bg-orange-50 rounded-lg shadow-md">
                            <h4 className="text-2xl font-semibold text-black mb-2">Educational Background</h4>
                            <p className="">B.Sc. in Computer Science</p>
                            <p className="">Bangladesh University of Business and Technology</p>
                        </div>
                        
                        {/* Experience */}
                        <div className="p-6 bg-orange-50 rounded-lg shadow-md">
                            <h4 className="text-2xl font-semibold text-black mb-2">Experience</h4>
                            <p className="">1.5 years of experience in full-stack web development</p>
                            {/* <p className="">Worked at TechCorp, WebDev Inc., and CodeMasters</p> */}
                        </div>
                        
                        {/* Technology Expertise */}
                        <div className="p-6 bg-orange-50 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold text-black mb-4">Technology Expertise</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                <div className="flex items-center space-x-2 text-black">
                    <FaHtml5 className="w-6 h-6" />
                    <span>HTML5</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaCss3Alt className="w-6 h-6" />
                    <span>CSS3</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaBootstrap className="w-6 h-6" />
                    <span>Bootstrap</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <SiTailwindcss className="w-6 h-6" />
                    <span>Tailwind</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <SiJavascript className="w-6 h-6" />
                    <span>JavaScript</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaReact className="w-6 h-6" />
                    <span>React.js</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <SiExpress className="w-6 h-6" />
                    <span>Express.js</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaNodeJs className="w-6 h-6" />
                    <span>Node.js</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <SiMongodb className="w-6 h-6" />
                    <span>MongoDB</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaGit className="w-6 h-6" />
                    <span>Git</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <FaGithub className="w-6 h-6" />
                    <span>GitHub</span>
                </div>
                <div className="flex items-center space-x-2 text-black">
                    <SiTypescript className="w-6 h-6" />
                    <span>TypeScript</span>
                </div>
                
                
            </div>
        </div>
                        
                        {/* Contact Information */}
                        <div className="p-6 bg-orange-50 rounded-lg shadow-md">
                            <h4 className="text-2xl font-semibold text-black mb-2">Contact Information</h4>
                            <div className="flex flex-col items-center lg:items-start space-y-2">
                                <p className="flex items-center ">
                                    <FaEnvelope className="mr-2" /> est.ahmed111@example.com
                                </p>
                                <p className="flex items-center ">
                                    <FaLinkedin className="mr-2" />
                                    <a href="https://www.linkedin.com/in/eshtiaque-ahmed-150097235/" className="text-blue-500 hover:underline">
                                    linkedin.com/in/eshtiaque-ahmed-150097235
                                    </a>
                                </p>
                                <p className="flex items-center ">
                                    <FaGithub className="mr-2" />
                                    <a href="https://github.com/Eshtiaque/" className="text-blue-500 hover:underline">
                                    github.com/Eshtiaque
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        
    );
};

export default DevInfo;
