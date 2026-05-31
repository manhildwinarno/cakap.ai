export interface JobListing {
  id: string;
  company: string;
  role: {
    en: string;
    id: string;
  };
  type: {
    en: string;
    id: string;
  };
  description: {
    en: string;
    id: string;
  };
}

export const JOB_LISTINGS: JobListing[] = [
  {
    id: "1",
    company: "TechCorp",
    role: {
      en: "Frontend Developer",
      id: "Frontend Developer"
    },
    type: {
      en: "Full-time",
      id: "Penuh Waktu"
    },
    description: {
      en: "We are looking for a skilled Frontend Developer to join our core product team. You will be responsible for building responsive, accessible, and high-performance user interfaces using React and Next.js. Experience with Tailwind CSS and Framer Motion is a major plus.",
      id: "Kami sedang mencari Frontend Developer yang terampil untuk bergabung dengan tim produk inti kami. Anda akan bertanggung jawab untuk membangun antarmuka pengguna yang responsif, mudah diakses, dan berkinerja tinggi menggunakan React dan Next.js. Pengalaman dengan Tailwind CSS dan Framer Motion merupakan nilai tambah yang besar."
    }
  },
  {
    id: "2",
    company: "SafeLab Systems",
    role: {
      en: "IoT Solutions Architect",
      id: "Arsitek Solusi IoT"
    },
    type: {
      en: "Remote",
      id: "Remote"
    },
    description: {
      en: "Join our innovative hardware division to design scalable IoT architectures for smart city initiatives. The ideal candidate has deep expertise in embedded systems, MQTT protocols, and edge computing platforms. You'll lead technical strategy from prototype to deployment.",
      id: "Bergabunglah dengan divisi perangkat keras inovatif kami untuk merancang arsitektur IoT yang skalabel untuk inisiatif kota pintar. Kandidat ideal memiliki keahlian mendalam dalam sistem tertanam (embedded systems), protokol MQTT, dan platform edge computing. Anda akan memimpin strategi teknis dari prototipe hingga penerapan."
    }
  },
  {
    id: "3",
    company: "NusaNetworks",
    role: {
      en: "Network Engineer",
      id: "Teknisi Jaringan"
    },
    type: {
      en: "Hybrid",
      id: "Hibrida"
    },
    description: {
      en: "Seeking a Network Engineer to manage and optimize our enterprise network infrastructure. You will troubleshoot routing issues, configure Cisco/Juniper switches, and ensure network security compliance across multiple data centers.",
      id: "Mencari Teknisi Jaringan untuk mengelola dan mengoptimalkan infrastruktur jaringan perusahaan kami. Anda akan memecahkan masalah perutean (routing), mengonfigurasi sakelar Cisco/Juniper, dan memastikan kepatuhan keamanan jaringan di beberapa pusat data."
    }
  },
  {
    id: "4",
    company: "Fintech Prima",
    role: {
      en: "Backend Go Developer",
      id: "Pengembang Go Backend"
    },
    type: {
      en: "Full-time",
      id: "Penuh Waktu"
    },
    description: {
      en: "Develop high-throughput, low-latency microservices for our payment processing pipeline. Strong knowledge of Golang, PostgreSQL, and gRPC is required. You will work closely with the security team to maintain PCI-DSS compliance.",
      id: "Kembangkan microservices dengan throughput tinggi dan latensi rendah untuk pipa pemrosesan pembayaran kami. Diperlukan pengetahuan yang kuat tentang Golang, PostgreSQL, dan gRPC. Anda akan bekerja sama dengan tim keamanan untuk menjaga kepatuhan PCI-DSS."
    }
  },
  {
    id: "5",
    company: "AgriTech Indonesia",
    role: {
      en: "Data Scientist",
      id: "Ilmuwan Data"
    },
    type: {
      en: "Remote",
      id: "Remote"
    },
    description: {
      en: "Analyze agricultural sensor data to build predictive crop yield models. We are looking for someone proficient in Python, TensorFlow, and statistical analysis to help farmers make data-driven decisions for sustainable agriculture.",
      id: "Analisis data sensor pertanian untuk membangun model prediksi hasil panen. Kami mencari seseorang yang mahir dalam Python, TensorFlow, dan analisis statistik untuk membantu petani membuat keputusan berbasis data untuk pertanian berkelanjutan."
    }
  },
  {
    id: "6",
    company: "Kreatif Studio",
    role: {
      en: "UX/UI Designer",
      id: "Desainer UX/UI"
    },
    type: {
      en: "Contract",
      id: "Kontrak"
    },
    description: {
      en: "Design intuitive and beautiful mobile applications for our e-commerce clients. You'll be conducting user research, creating wireframes, and building high-fidelity prototypes in Figma while collaborating with engineering teams.",
      id: "Desain aplikasi seluler yang intuitif dan indah untuk klien e-commerce kami. Anda akan melakukan penelitian pengguna, membuat wireframe, dan membangun prototipe dengan kesetiaan tinggi (high-fidelity) di Figma sambil berkolaborasi dengan tim teknik."
    }
  }
];
