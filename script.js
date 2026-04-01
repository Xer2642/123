// IndexedDB存储管理
class ImageStorage {
    constructor() {
        this.dbName = 'portfolioImages';
        this.dbVersion = 1;
        this.db = null;
    }

    // 初始化数据库
    init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, this.dbVersion);

            request.onerror = (event) => {
                console.error('IndexedDB错误:', event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                
                // 创建存储对象
                if (!db.objectStoreNames.contains('images')) {
                    db.createObjectStore('images', { keyPath: 'id' });
                }
            };
        });
    }

    // 保存图片数据
    saveImages(projectId, images) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                this.init().then(() => this.saveImages(projectId, images)).then(resolve).catch(reject);
                return;
            }

            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.put({ id: projectId, images: images });

            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    }

    // 获取图片数据
    getImages(projectId) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                this.init().then(() => this.getImages(projectId)).then(resolve).catch(reject);
                return;
            }

            const transaction = this.db.transaction(['images'], 'readonly');
            const store = transaction.objectStore('images');
            const request = store.get(projectId);

            request.onsuccess = (event) => {
                const data = event.target.result;
                resolve(data ? data.images : []);
            };
            request.onerror = (event) => reject(event.target.error);
        });
    }

    // 删除图片数据
    deleteImages(projectId) {
        return new Promise((resolve, reject) => {
            if (!this.db) {
                this.init().then(() => this.deleteImages(projectId)).then(resolve).catch(reject);
                return;
            }

            const transaction = this.db.transaction(['images'], 'readwrite');
            const store = transaction.objectStore('images');
            const request = store.delete(projectId);

            request.onsuccess = () => resolve();
            request.onerror = (event) => reject(event.target.error);
        });
    }
}

// 创建存储实例
const imageStorage = new ImageStorage();

// 加载本地图片
async function loadLocalImages() {
    const projects = [
        { id: 'project-1', folder: 'project-1', name: '西北旺效果图展示' },
        { id: 'project-2', folder: 'project-2', name: '孔雀城大湖天玺' },
        { id: 'project-3', folder: 'project-3', name: '燕西华府' },
        { id: 'comfui-gallery', folder: 'comfui', name: 'ComfUI' }
    ];
    
    for (const project of projects) {
        try {
            // 尝试加载本地图片
            const gallery = document.getElementById(project.id);
            if (!gallery) continue;
            
            // 清空画廊
            gallery.innerHTML = '';
            
            // 为每个项目添加图片
            let imageCount = 0;
            
            // 对于project-1
            if (project.id === 'project-1') {
                // 已知的图片文件名
                const images = [
                    '03900d1b9cc3e22835eb2d98841ee326.png',
                    '03e886a3b5950ac5ce5fba4ea09c1a43.png',
                    '09550b107fc8eaccce9a7a4cb00d4d53.png',
                    '10101b2d5b80d967635cd04c36ac526c.png',
                    '1092414c65b84f62daec78de43b2e5fa.png',
                    '134d381db1b49deae893d959292bf347.png',
                    '13df24fba71b5f58a94980e7d7e80b08.png',
                    '1c428fdafdaa194e60c46e14c6423828.png',
                    '23c74656c20eafbf79adb1e3ed93752e.png',
                    '29ef36a367591083e73296a88c1933d9.png',
                    '2dc56836a35c8456b71207ef5abc32b9.png',
                    '2f852f40d2a519ca4754c9b5f584289a.png',
                    '3274c93c9452c22d5f2221315aab3339.png',
                    '534ea0b9a0823ba5c2084da08617f454.png',
                    '564ded025f0ac82ffac719c62b09ce6b.png',
                    '5682c595f259bace43311e12c653d764.png',
                    '573512b191b5aa0138908d475725eac3.png',
                    '5a880488a8d1cab5c81bfe9ffe785aaf.png',
                    '6920cf7aa95ee9553d7a555b84eece36.png',
                    '6ad39886ee76ad9609985115b9e761dc.png',
                    '856c375381679c51e6960d506db7b16c.png',
                    'ba4f28c5b5e89d0c75ec9987262a7221.png',
                    'bdf54df6c5661d6c46d37c0c725cadca.png',
                    'cda66390f59d43eab74fbebee3dd2de8.png',
                    'ed2ee1c32e25ab00c7595f60091c3f2c.png',
                    'f15c12c3411be4404a9789463cfac24f.png',
                    'f48c5569c73e0d2e7e067b5c9216363f.png',
                    'f4a2901eaccecf557f50cbf9ca106326.png',
                    'ff9a21445800230d6ae1a3573ffbda41.png'
                ];
                
                images.forEach((filename, index) => {
                    const imgPath = `images/${project.folder}/${filename}`;
                    addImageToGallery(gallery, imgPath, project.id, index);
                    imageCount++;
                });
            }
            // 对于project-2
            else if (project.id === 'project-2') {
                for (let i = 1; i <= 47; i++) {
                    const imgPath = `images/${project.folder}/${i}.png`;
                    addImageToGallery(gallery, imgPath, project.id, i - 1);
                    imageCount++;
                }
            }
            // 对于project-3
            else if (project.id === 'project-3') {
                for (let i = 1; i <= 8; i++) {
                    const imgPath = `images/${project.folder}/${i}.png`;
                    addImageToGallery(gallery, imgPath, project.id, i - 1);
                    imageCount++;
                }
            }
            // 对于comfui
            else if (project.id === 'comfui-gallery') {
                const imgPath = `images/${project.folder}/comfyUI.png`;
                addImageToGallery(gallery, imgPath, project.id, 0);
                imageCount++;
            }
            
            console.log(`📷 为 ${project.name} 加载了 ${imageCount} 张本地图片`);
            
        } catch (error) {
            console.error(`加载 ${project.name} 本地图片时出错:`, error);
        }
    }
}

// 添加图片到画廊
function addImageToGallery(gallery, imgPath, projectId, index) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    
    const img = document.createElement('img');
    img.src = imgPath;
    img.alt = `图片 ${index + 1}`;
    img.className = 'gallery-image';
    
    galleryItem.appendChild(img);
    gallery.appendChild(galleryItem);
    
    // 添加图片点击预览功能
    img.addEventListener('click', function() {
        openModal(imgPath);
    });
}

// 等待DOM完全加载
document.addEventListener('DOMContentLoaded', function() {
    // 加载本地图片
    loadLocalImages();
    
    // ===== 导航栏功能 =====
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

// 滚动时导航栏效果
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // 更新活动导航链接
    updateActiveNavLink();
});

// 移动端菜单切换
if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navToggle && navMenu) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// 更新活动导航链接
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== 滚动显示动画 =====
const revealElements = document.querySelectorAll('.reveal');

function revealOnScroll() {
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('active');
        }
    });
}

// ===== 图片预览和缩放功能 =====

// 创建图片预览模态框
function createImageModal() {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <img class="modal-image" src="" alt="预览图片">
        </div>
    `;
    document.body.appendChild(modal);
    
    // 关闭模态框
    const closeButton = modal.querySelector('.modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    return modal;
}

const imageModal = createImageModal();
const modalImage = imageModal.querySelector('.modal-image');

// 为所有图片添加悬停和点击功能
function setupImageInteractions() {
    console.log('Setting up image interactions...');
    const galleryItems = document.querySelectorAll('.gallery-item');
    console.log('Found gallery items:', galleryItems.length);
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        console.log('Found img:', img);
        
        if (img) {
            // 点击图片放大
            img.addEventListener('click', function() {
                modalImage.src = img.src;
                imageModal.style.display = 'flex';
            });
        }
    });
    
    // 点击模态框中的图片可以缩放
    if (modalImage) {
        modalImage.addEventListener('click', function() {
            if (modalImage.classList.contains('zoomed')) {
                modalImage.classList.remove('zoomed');
            } else {
                modalImage.classList.add('zoomed');
            }
        });
    }
}

// 图片上传和保存功能




// 加载保存的ComfUI图片
async function loadSavedComfUIImages() {
    const gallery = document.getElementById('comfui-gallery');
    
    if (gallery) {
        // 检查是否已经有本地图片加载
        const hasLocalImages = gallery.children.length > 0;
        
        if (!hasLocalImages) {
            try {
                const images = await imageStorage.getImages('comfui-gallery');
                
                gallery.innerHTML = '';
                
                images.forEach((imgData, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    
                    const img = document.createElement('img');
                    img.src = imgData;
                    img.alt = `ComfUI图片 ${index + 1}`;
                    img.className = 'gallery-image';
                    
                    galleryItem.appendChild(img);
                    gallery.appendChild(galleryItem);
                });
                
                // 为加载的图片添加交互功能
                setupImageInteractions();
                
                // 添加+按钮
                addAddButton(gallery, 'comfui-gallery');
            } catch (error) {
                console.error('加载图片失败:', error);
            }
        } else {
            console.log('📷 ComfUI本地图片已加载，跳过保存的图片加载');
            // 为已加载的本地图片添加+按钮
            addAddButton(gallery, 'comfui-gallery');
        }
    }
}

// 处理图片上传


// 更新所有+按钮位置


// 添加长按拖动功能


// 加载保存的ComfUI图片
async function loadSavedComfUIImages() {
    const gallery = document.getElementById('comfui-gallery');
    
    if (gallery) {
        // 检查是否已经有本地图片加载
        const hasLocalImages = gallery.children.length > 0;
        
        if (!hasLocalImages) {
            try {
                const images = await imageStorage.getImages('comfui-gallery');
                
                gallery.innerHTML = '';
                
                images.forEach((imgData, index) => {
                    const galleryItem = document.createElement('div');
                    galleryItem.className = 'gallery-item';
                    
                    const img = document.createElement('img');
                    img.src = imgData;
                    img.alt = `ComfUI图片 ${index + 1}`;
                    img.className = 'gallery-image';
                    
                    galleryItem.appendChild(img);
                    gallery.appendChild(galleryItem);
                });
                
                // 为加载的图片添加交互功能
                setupImageInteractions();
                
                // 添加+按钮
                addAddButton(gallery, 'comfui-gallery');
            } catch (error) {
                console.error('加载图片失败:', error);
            }
        } else {
            console.log('📷 ComfUI本地图片已加载，跳过保存的图片加载');
            // 为已加载的本地图片添加+按钮
            addAddButton(gallery, 'comfui-gallery');
        }
    }
}

// 加载保存的图片
async function loadSavedImages() {
    // 只在本地图片未加载时加载保存的图片
    // 检查是否已经有本地图片加载
    const project1Gallery = document.getElementById('project-1');
    const hasLocalImages = project1Gallery && project1Gallery.children.length > 0;
    
    if (!hasLocalImages) {
        for (let i = 1; i <= 3; i++) {
            const projectId = `project-${i}`;
            const gallery = document.getElementById(projectId);
            
            if (gallery) {
                try {
                    const images = await imageStorage.getImages(projectId);
                    
                    gallery.innerHTML = '';
                    
                    images.forEach((imgData, index) => {
                        const galleryItem = document.createElement('div');
                        galleryItem.className = 'gallery-item';
                        
                        const img = document.createElement('img');
                        img.src = imgData;
                        img.alt = `图片 ${index + 1}`;
                        img.className = 'gallery-image';
                        
                        galleryItem.appendChild(img);
                        gallery.appendChild(galleryItem);
                    });
                    
                    // 为加载的图片添加交互功能
                    setupImageInteractions();
                    
                    // 添加+按钮
                    addAddButton(gallery, projectId);
                } catch (error) {
                    console.error('加载图片失败:', error);
                }
            }
        }
    } else {
        console.log('📷 本地图片已加载，跳过保存的图片加载');
        // 为已加载的本地图片添加+按钮
        updateAddButtons();
    }
}

// 更新保存的图片


// 初始化图片交互
setupImageInteractions();



// 监听新添加的图片
const mutationObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
            if (node.classList && node.classList.contains('gallery-item')) {
                setupImageInteractions();
            }
        });
    });
});

// 观察所有项目画廊
document.querySelectorAll('.project-gallery').forEach(gallery => {
    mutationObserver.observe(gallery, { childList: true, subtree: true });
});

// ===== Intersection Observer 用于触发动画 =====
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // 添加显示动画类
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// 观察所有需要动画的区域
document.querySelectorAll('.interior, .comfui').forEach(section => {
    intersectionObserver.observe(section);
});

// ===== 鼠标跟随效果（Hero区域）=====
const hero = document.querySelector('.hero');
const shapes = document.querySelectorAll('.shape');

if (hero && !window.matchMedia('(pointer: coarse)').matches) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        
        const xPos = (clientX / innerWidth - 0.5) * 20;
        const yPos = (clientY / innerHeight - 0.5) * 20;
        
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.5;
            shape.style.transform = `translate(${xPos * speed}px, ${yPos * speed}px)`;
        });
    });
}

// ===== 打字机效果 =====
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// 为副标题添加打字机效果
const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const originalText = heroSubtitle.textContent;
    
    // 使用 Intersection Observer 触发动画
    const subtitleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeWriter(heroSubtitle, originalText, 80);
                subtitleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    subtitleObserver.observe(heroSubtitle);
}

// ===== 视差滚动效果 =====
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    
    // Hero 区域视差
    const heroContent = document.querySelector('.hero-content');
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// ===== 按钮点击波纹效果 =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.style.cssText = `
            position: absolute;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            left: ${x}px;
            top: ${y}px;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// 添加波纹动画样式
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== 页面加载动画 =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 触发初始动画
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// ===== 返回顶部按钮 =====
const backToTopBtn = document.createElement('button');
backToTopBtn.innerHTML = '↑';
backToTopBtn.className = 'back-to-top';
backToTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 1.5rem;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(99, 102, 241, 0.4);
    z-index: 999;
`;

document.body.appendChild(backToTopBtn);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTopBtn.style.opacity = '1';
        backToTopBtn.style.visibility = 'visible';
    } else {
        backToTopBtn.style.opacity = '0';
        backToTopBtn.style.visibility = 'hidden';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== 图片懒加载 =====
const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// ===== 键盘导航支持 =====
document.addEventListener('keydown', (e) => {
    // ESC 关闭移动端菜单
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== 性能优化：防抖函数 =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化滚动事件
const optimizedScrollHandler = debounce(() => {
    revealOnScroll();
}, 10);

window.addEventListener('scroll', optimizedScrollHandler);

console.log('🎨 Portfolio website loaded successfully!');


});
