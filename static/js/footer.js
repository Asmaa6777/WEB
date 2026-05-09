class MainFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <footer class="site-footer">
                <div class="footer-content">
                    <div class="footer-brand">
                        <div class="logo">
                            <span class="logo-icon">R</span>
                            <span class="logo-text">Recipe<span class="logo-highlight">Finder</span></span>
                        </div>
                        <p>Discover exquisite recipes crafted by world-class chefs. Your journey to culinary excellence starts here.</p>
                    </div>
                    
                    <div class="footer-links">
                        <h4>Quick Links</h4>
                        <a href="/">Home</a>
                        <a href="/recipes/">Recipes</a>
                        <a href="/social/favorites/">Favourites</a>
                    </div>

                    <div class="footer-links">
                        <h4>Categories</h4>
                        <a href="/recipes/appetizer/">Appetizers</a>
                        <a href="/recipes/main-course/">Main Course</a>
                        <a href="/recipes/dessert/">Dessert</a>
                    </div>

                    <div class="footer-contact">
                        <h4>Contact</h4>
                        <p>hello@recipefinder.com</p>
                        <p>+1 (555) 234-5678</p>
                        <p>Cairo, Egypt</p>
                    </div>
                </div>
                
                <div class="footer-bottom">
                    <p>&copy; 2026 RecipeFinder. All rights reserved.</p>
                    <div class="bottom-links">
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                    </div>
                </div>
            </footer>
        `;
    }
}

// Registers your new custom HTML tag!
customElements.define('main-footer', MainFooter);
