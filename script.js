document.getElementById('coletaDadosForm').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    const formData = new FormData(this);

    try {
        const response = await fetch('http://localhost:3000/enviar-dados', { // Altere para a URL do seu servidor
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('Dados enviados com sucesso!');
        } else {
            alert('Erro ao enviar os dados');
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});
