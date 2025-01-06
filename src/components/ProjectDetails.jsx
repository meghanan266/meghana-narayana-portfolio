import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function ProjectDetails() {
    const { projectId } = useParams();
    const [project, setProject] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);


    useEffect(() => {
        fetch('/assets/projectDetails.json') 
            .then((response) => response.json())
            .then((data) => {
                setProject(data[projectId]);
            })
            .catch((error) => console.error('Error fetching project details:', error));

        window.scrollTo(0, 0);
    }, [projectId]);

    if (!project) {
        return <div className="text-center py-20 text-2xl">Project not found.</div>;
    }

    return (
        <div className="p-10 md:p-20 bg-gradient-to-b from-black via-gray-800 to-black text-white min-h-screen">
            <div className="max-w-6xl mx-auto mt-10">
                {/* Header Section */}
                <h2 className="text-5xl font-extrabold mb-6 text-Apricot text-center">
                    {project.title}
                </h2>
                <p className="text-lg text-gray-300 leading-relaxed text-center max-w-3xl mx-auto mb-12">
                    {project.description}
                </p>

                {/* Tech Stack */}
                <div className="mb-16 text-center">
                    <h3 className="text-3xl font-semibold mb-8 text-Apricot">Tech Stack</h3>
                    <div className="flex justify-center gap-10 flex-wrap">
                        {project.techStackIcons.map((icon, idx) => (
                            <div key={idx} className="group flex flex-col items-center space-y-2">
                                <img
                                    src={icon}
                                    alt="Tech Stack Icon"
                                    className="h-20 w-20 rounded-lg shadow-md hover:scale-110 transition-transform duration-300"
                                />
                                <span className="text-sm text-gray-400 group-hover:text-Apricot">
                                    {project.technologies[idx]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* GitHub Link */}
                {project.link && (
                    <div className="text-center mt-15 mb-20">
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-Apricot px-10 py-4 rounded-lg text-lg font-semibold hover:bg-AppleCore hover:text-white transition-all duration-300"
                        >
                            View Project
                        </a>
                    </div>
                )}


                {/* Key Features */}
                <div className="bg-gray-800 p-8 rounded-lg shadow-lg mb-16">
                    <h3 className="text-3xl font-semibold mb-6 text-Apricot">Key Features</h3>
                    <ul className="space-y-4">
                        {project.keyFeatures.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-4">
                                <span className="h-4 w-4 bg-Apricot rounded-full inline-block"></span>
                                <p className="text-lg">{feature}</p>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Screenshots */}
                {project.screenshots && (
                    <div className="mb-16">
                        <h3 className="text-3xl font-semibold mb-6 text-Apricot">Screenshots</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {project.screenshots.map((screenshot, idx) => (
                                <div key={idx} className="relative overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
                                    <img
                                        src={screenshot}
                                        alt={`Screenshot ${idx + 1}`}
                                        className="w-full"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
