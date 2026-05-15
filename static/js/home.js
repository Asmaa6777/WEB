document.addEventListener('DOMContentLoaded', () => {
    
    // 1. INITIALIZE PAGE
    attachHeartLogic();
    attachCarouselLogic();

    // --- LOGIC FUNCTIONS ---

    function attachHeartLogic() {
        document.querySelectorAll('.heart-btn').forEach(btn => {
            btn.addEventListener('click', async (e) => {
                e.preventDefault();
                const recipeId = btn.getAttribute('data-id');
                const svg = btn.querySelector('svg');

                try {
                    const response = await fetch(`/social/favorite/toggle/${recipeId}/`, {
                        method: 'POST',
                        headers: {
                            'X-CSRFToken': getCookie('csrftoken'),
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    });

                    if (response.status === 403) {
                        window.location.href = '/accounts/login/';
                        return;
                    }

                    const data = await response.json();
                    if (data.status === 'added') {
                        svg.setAttribute('fill', '#d4af37');
                        svg.setAttribute('stroke', '#d4af37');
                    } else {
                        svg.setAttribute('fill', 'none');
                        svg.setAttribute('stroke', 'currentColor');
                    }
                } catch (error) {
                    console.error('Error toggling favorite:', error);
                }
            });
        });
    }

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function attachCarouselLogic() {
        document.querySelectorAll('.carousel-container').forEach(carousel => {
            let isDown = false, startX, scrollLeft;
            carousel.addEventListener('mousedown', (e) => {
                isDown = true;
                carousel.style.cursor = 'grabbing';
                startX = e.pageX - carousel.offsetLeft;
                scrollLeft = carousel.scrollLeft;
            });
            carousel.addEventListener('mouseleave', () => { isDown = false; carousel.style.cursor = 'pointer'; });
            carousel.addEventListener('mouseup', () => { isDown = false; carousel.style.cursor = 'pointer'; });
            carousel.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - carousel.offsetLeft;
                const walk = (x - startX) * 2;
                carousel.scrollLeft = scrollLeft - walk;
            });
        });
    }
});
