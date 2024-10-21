<script>
    document.getElementById('coletaDadosForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        
        const formData = new FormData(this);

        try {
            const response = await fetch('URL_GOOGLE_APPS_SCRIPT', {
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
</script>
