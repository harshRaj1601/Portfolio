const projects = [
  {
    "id": 1,
    "title": "NN Builder",
    "description": "A web-based application for building, training, and deploying neural networks with a user-friendly interface. This tool allows users to easily create, customize, and train neural networks for both classification and regression tasks.",
    "longDescription": "NN Builder is a web application that enables users to visually design, train, and test neural network architectures without writing code. It supports dataset uploads, provides AI-powered architecture suggestions, and offers real-time training monitoring. The project aims to make deep learning more accessible to beginners while providing powerful features for experienced users.",
    "image": "/src/assets/nnbuilder1.png",
    "gallery": [
      // "src/assets/nnbuilder1.png",
      "src/assets/nnbuilder2.png",
      "src/assets/nnbuilder3.png",
    ],
    "tags": ["Python", "Flask", "Neural Networks", "Machine Learning", "Web Development", "Deep Learning", "Tensorflow", "Automation"],
    "featured": true,
    "demoLink": "",
    "codeLink": "https://github.com/harshRaj1601/NN-Builder",
    "features": [
      "Interactive Model Building: Visually design neural network architectures",
      "Dataset Handling: Upload and preprocess CSV datasets automatically",
      "Smart Architecture Suggestions: Get AI-powered suggestions for network architecture based on your dataset",
      "Real-time Training Monitoring: Watch training progress with live updates on metrics like accuracy and loss",
      "Model Export: Download trained models and corresponding Python code for deployment or further development"
    ]
  },
  {
    id: 2,
    title: "FlaskForge",
    description: "A CLI-based Flask setup tool that automates the creation of Flask directories with basic code and additional features, streamlining the development process.",
    longDescription: "FlaskForge is a command-line tool designed to accelerate Flask application development by automating the project setup process. It generates a well-structured Flask application with configurable features like authentication, database integration, and API endpoints based on user preferences.",
    image: "src/assets/flaskforge.png",
    tags: ["Python", "Flask", "CLI", "Automation", "Web Development","Machine Learning"],
    featured: true,
    codeLink: "https://github.com/harshRaj1601/flaskforge",
    features: [
      "Interactive CLI wizard for customizing project structure according to user preferences",
      "Library Installation and Suggetions according to user preferences",
      "Virtual Environment Creation",
      "Database Integration (SQLAlchemy)",
      "Authentication and Authorization",
      "CSS and JS Integration",
    ]
  },
  {
    id: 3,
    title: "ClothSize Measurement Tool",
    description: "A Computer Vision project, can measure and predict cloth size of the person",
    longDescription: "ClothSize is an innovative solution that uses computer vision and machine learning to extract precise body measurements from images. This technology helps online shoppers find the right clothing size, reducing returns and improving customer satisfaction in e-commerce.",
    image: "src/assets/fitcam.png",
    tags: ["Python", "Computer Vision", "Image Processing", "TensorFlow", "OpenCV", "MediaPipe", "Mathematics"],
    featured: true,
    codeLink: "https://github.com/harshRaj1601/clothmess",
    features: [
      "Real-time body measurements using webcam",
      "Option to upload photos for measurements",
      "Gender-specific clothing size recommendations",
      "User-friendly web interface",
      "Accurate measurements of chest, waist, and other body dimensions"
    ],
  },
  {
    id: 4,
    title: "AutoPylot",
    description: "A library that automatically installs all imported libraries in a Python file or an entire project directory, streamlining dependency management.",
    image: "src/assets/autopylot.png",
    tags: ["Python", "Automation", "Package Management", "Developer Tools"],
    featured: false,
    codeLink: "https://github.com/harshRaj1601/autopylot",
    features: [
      "Automatic detection of imports in Python files",
      "Smart version resolution to avoid conflicts",
      "Support for project-wide or file-specific installation",
      "Virtual environment integration",
      "Custom package source configuration"
    ]
  },
  {
    id: 5,
    title: "VoiceCL",
    description: "A voice cloning tool that generates audio for input text in any person's voice using advanced machine learning techniques.",
    longDescription: "VoiceCL is a state-of-the-art voice cloning system that uses deep learning to synthesize natural-sounding speech that mimics a target speaker's voice. With just a short audio sample, the system can generate unlimited new speech in the same voice, enabling applications in accessibility, content creation, and personalized user experiences.",
    image: "src/assets/voicecl.png",
    tags: ["Python", "Machine Learning", "Voice Synthesis", "Audio Processing", "PyTorch"],
    featured: true,
    codeLink: "",
    features: [
      "High-quality voice cloning from just 10 seconds of reference audio",
      "Emotional tone and emphasis control",
      "Multi-language support with accent preservation",
      "Indian Language Support",
      "Privacy-focused with on-device processing options"
    ],
  },
  {
    id: 6,
    title: "Survion",
    description: "A computer vision project that detects suspicious activities and sends alerts with photos via email, enhancing security monitoring capabilities.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Python", "Computer Vision", "Security", "Email Integration", "OpenCV"],
    featured: false,
    demoLink: "",
    codeLink: "",
    features: [
      "Real-time motion and activity detection",
      "Person identification with facial recognition",
      "Instant alerts via email and push notifications",
      "Person Identification message via email and push notifications",
      "Video recording with cloud storage integration"
    ]
  },
  {
    id: 7,
    title: "PoseGuard",
    description: "A detection system that identifies distracted drivers and sends alerts to vehicle owners, improving road safety through computer vision.",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    tags: ["Python", "Computer Vision", "Safety Systems", "TensorFlow", "Alert System"],
    featured: false,
    demoLink: "https://poseguard.com",
    codeLink: "https://github.com/harshraj1601/poseguard",
    features: [
      "Real-time driver pose estimation",
      "Distraction detection",
      "Custom alert thresholds and sensitivity settings",
      "Beep sound alert",
      "Email alert with photo to vehicle owner",
      "Dashboard with driving behavior analytics",
      "Integration with vehicle telematics systems"
    ]
  },
  {
    id: 8,
    title: "Retinal Segmentation",
    description: "A machine learning project for predicting retinal diseases through image segmentation, assisting in medical diagnostics and treatment planning.",
    longDescription: "This project uses deep learning techniques to automatically segment and analyze retinal images for early detection of various eye diseases. By providing accurate segmentation of retinal structures and identifying abnormalities, the system helps ophthalmologists make faster and more accurate diagnoses.",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523821741446-edb2b68bb7a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1629909613654-28e377c37b09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80"
    ],
    tags: ["Python", "Medical Imaging", "Image Segmentation", "Deep Learning", "Healthcare"],
    featured: true,
    demoLink: "",
    codeLink: "",
    features: [
      "Automated segmentation of retinal structures (vessels, optic disc, macula)",
      "Detection of abnormalities indicative of diseases like diabetic retinopathy, glaucoma, and macular degeneration",
      "Quantitative analysis of disease progression",
      "Integration with hospital information systems",
      "Mask Generation using UNET model"
    ],
  }
];

export default projects; 