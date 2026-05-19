/**
 * Profile & Brand Configuration API
 * Tất cả thông tin hiển thị được quản lý từ đây
 */

export const PROFILE_CONFIG = {
  // Thông tin thương hiệu chính
  brand: {
    name: "[YOUR BRAND NAME]",
    slogan: "Khám phá thế giới số học",
    description: "[YOUR INTRODUCTION TEXT]",
    avatar: "https://via.placeholder.com/150?text=LOGO",
    theme: "cinematic-ocean"
  },

  // Thông tin liên hệ
  contact: {
    email: "[YOUR EMAIL]",
    phone: "[YOUR PHONE NUMBER]",
    website: "[YOUR WEBSITE]",
    facebook: "[YOUR FACEBOOK LINK]"
  },

  // Thông tin bổ sung
  social: {
    facebook: {
      icon: "Facebook",
      label: "Facebook",
      url: "[YOUR FACEBOOK LINK]"
    },
    email: {
      icon: "Mail",
      label: "Email",
      url: "mailto:[YOUR EMAIL]"
    },
    phone: {
      icon: "Phone",
      label: "Gọi điện",
      url: "tel:[YOUR PHONE NUMBER]"
    },
    website: {
      icon: "Globe",
      label: "Website",
      url: "[YOUR WEBSITE]"
    }
  },

  // Phần các bộ phận khác (Giới thiệu, Kỹ năng, v.v.)
  sections: {
    hero: {
      title: "The Lonely Journey",
      subtitle: "Portfolio Interaktif - Khám Phá Kỹ Năng Số Học"
    },
    about: {
      title: "Giới Thiệu",
      content: "Mục tiêu của tôi là tạo ra các giao diện front-end đắm chìm kết hợp với kiến trúc server hiệu năng cao."
    },
    skills: [
      { name: "React", icon: "Zap", desc: "UI Framework" },
      { name: "JavaScript", icon: "Code", desc: "Ngôn ngữ lõi" },
      { name: "Node JS", icon: "Server", desc: "Máy chủ" },
      { name: "CSS3/WebGL", icon: "Palette", desc: "Styling & 3D" }
    ],
    projects: [
      { title: "Project 1", description: "Mô tả dự án" },
      { title: "Project 2", description: "Mô tả dự án" }
    ],
    experience: [
      { company: "Company", position: "Role", period: "2024-2026" }
    ],
    contact: {
      title: "Liên Hệ",
      message: "Hãy liên hệ với tôi qua các kênh bên dưới"
    }
  }
};

/**
 * API Helper Functions
 */

export async function updateProfileConfig(section, key, value) {
  try {
    // Simulated API call - Thay bằng actual API endpoint
    console.log(`Updating ${section}.${key} = ${value}`);
    
    // Example: POST to your backend
    // const response = await fetch('/api/profile/update', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ section, key, value })
    // });
    // return await response.json();
    
    return { success: true, message: "Updated successfully" };
  } catch (error) {
    console.error("API Error:", error);
    return { success: false, error: error.message };
  }
}

export async function getProfileData() {
  try {
    // Fetch từ API backend (nếu có)
    // const response = await fetch('/api/profile');
    // return await response.json();
    
    // Tạm thời return config tĩnh
    return PROFILE_CONFIG;
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return PROFILE_CONFIG;
  }
}

export default PROFILE_CONFIG;
