// Encontra os elementos na página
const menuToggle = document.getElementById('menu-toggle');
const wrapper = document.getElementById('wrapper');

// Adiciona um "ouvinte" de clique ao botão
menuToggle.addEventListener('click', function() {
    // Adiciona ou remove a classe 'toggled' do elemento #wrapper
    wrapper.classList.toggle('toggled');
});


document.addEventListener("DOMContentLoaded", function() {

    // Lógica para alternar o conteúdo principal com base no item do menu
    var menuItems = document.querySelectorAll('#sidebar-wrapper .list-group-item');
    var allContentSections = document.querySelectorAll('.content-section');

    function hideAllContentSections() {
        allContentSections.forEach(function(section) {
            section.classList.remove('active-section');
        });
    }

    function showContentSection(id) {
        hideAllContentSections();
        var sectionToShow = document.getElementById(id);
        if (sectionToShow) {
            sectionToShow.classList.add('active-section');
        }
    }

    // Inicialmente, mostrar a seção 'dashboard'
    showContentSection('dashboard-content');

    menuItems.forEach(function(item) {
        item.addEventListener('click', function(e) {
            e.preventDefault();

            // Remove a classe 'active' de todos os itens do menu
            menuItems.forEach(function(el) {
                el.classList.remove('active');
            });

            // Adiciona a classe 'active' ao item clicado
            this.classList.add('active');

            // Obtém a seção de dados do atributo 'data-section'
            var targetSection = this.getAttribute('data-section');

            // Mapeia o data-section para o ID da div de conteúdo
            var contentIdMap = {
                'dashboard': 'dashboard-content',
                'acervo': 'acervo-content',
                'emprestimos-devolucoes': 'emprestimos-devolucoes-content',
                'usuarios': 'usuarios-content',
                'reservas-notificacoes': 'reservas-notificacoes-content',
                'multas-pagamentos': 'multas-pagamentos-content',
                'relatorios-estatisticas': 'relatorios-estatisticas-content',
                'canais-contato': 'canais-contato-content',
                'configuracoes': 'configuracoes-content'
            };

            var sectionToDisplayId = contentIdMap[targetSection];
            if (sectionToDisplayId) {
                showContentSection(sectionToDisplayId);
            }
        });
    });

    // --- Lógica para buscar livro por EAN/ISBN via API ---
    var eanInput = document.getElementById('eanInput');
    var searchEanBtn = document.getElementById('searchEanBtn');
    var bookDetailsCard = document.getElementById('bookDetails');
    var bookCover = document.getElementById('bookCover');
    var bookTitle = document.getElementById('bookTitle');
    var bookAuthors = document.getElementById('bookAuthors');
    var bookPublisher = document.getElementById('bookPublisher');
    var bookPublishedDate = document.getElementById('bookPublishedDate');
    var bookDescription = document.getElementById('bookDescription');

    if (searchEanBtn) {
        searchEanBtn.addEventListener('click', function() {
            var ean = eanInput.value.trim();
            if (ean) {
                fetch('api_proxy.php?ean=' + ean)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            console.error(data.error);
                            return;
                        }

                        console.log('Título:', data.title);
                        console.log('Autores:', data.authors.map(a => a.name).join(', '));
                        console.log('Número de páginas:', data.number_of_pages);
                        console.log('Editora:', data.publishers.map(p => p.name).join(', '));
                    })
                    .catch(error => console.error('Erro na requisição:', error));
                } else {
                alert('Por favor, digite um EAN/ISBN.');
            }
        });
    }

    const sidebar = document.getElementById('sidebar-wrapper');
    menuToggle.addEventListener('click', function() {
        sidebar.classList.toggle('d-none');
    });
});