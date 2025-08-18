window.addEventListener('pywebviewready', () => {
    load_select_clients();
    load_select_work_types();

    document.getElementById('work_client').addEventListener('change', async function() {
        const clientId = this.value;
        document.getElementById('client_ID').value = clientId || '';

        await load_select_dentists(clientId);  // carrega dentistas baseado no cliente

        await updateUnitPrice();  // atualiza preço unitário
        updateTotal();
    });

    document.getElementById('work_type').addEventListener('change', async function() {
        const typeId = this.value;
        document.getElementById('type_ID').value = typeId || '';
        await updateUnitPrice();
        updateTotal();
    });

    document.getElementById('quantity').addEventListener('input', updateTotal);
    document.getElementById('unit').addEventListener('input', updateTotal);

    document.getElementById('work_submit').addEventListener('click', buildWorkObject);
});

async function load_select_clients() {
    const select = document.getElementById('work_client');
    try {
        const clients = await window.pywebview.api.search.search_all_clients();
        clients.forEach(client => {
            const option = document.createElement('option');
            option.textContent = client.name;
            option.value = client.id;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar clientes:", error);
    }
}

async function load_select_work_types() {
    const select = document.getElementById('work_type');
    try {
        const work_types = await window.pywebview.api.search.search_all_work_types();
        work_types.forEach(type => {
            const option = document.createElement('option');
            option.textContent = type.description;
            option.value = type.id;
            select.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar tipos de trabalho:", error);
    }
}

// Novo: Carrega dentistas pelo id do cliente
async function load_select_dentists(clientId) {
    const select = document.getElementById('work_dentist');
    select.innerHTML = '<option value="">Selecione o Dentista</option>';

    if (!clientId) {
        select.disabled = true;
        return;
    }

    try {
        const dentists = await window.pywebview.api.search.search_dentists_by_client(clientId);

        if (dentists.length === 0) {
            select.disabled = true;
        } else {
            select.disabled = false;
            dentists.forEach(dentist => {
                const option = document.createElement('option');
                option.textContent = dentist.name;
                option.value = dentist.id;
                select.appendChild(option);
            });
        }
    } catch (error) {
        console.error("Erro ao carregar dentistas:", error);
        select.disabled = true;
    }
}


async function updateUnitPrice() {
    const clientId = document.getElementById('work_client').value;
    const typeId = document.getElementById('work_type').value;
    const unitInput = document.getElementById('unit');

    if (clientId && typeId) {
        try {
            const price = await window.pywebview.api.search.search_prices(clientId, typeId);
            if (price !== null && price !== undefined) {
                unitInput.value = price;
            } else {
                unitInput.value = '';
            }
        } catch (error) {
            console.error("Erro ao buscar preço unitário:", error);
            unitInput.value = '';
        }
    } else {
        unitInput.value = '';
    }
}

function updateTotal() {
    const quantity = parseFloat(document.getElementById('quantity').value) || 0;
    const unit = parseFloat(document.getElementById('unit').value) || 0;
    const totalInput = document.getElementById('total');

    totalInput.value = (quantity * unit).toFixed(2);
}

function buildWorkObject() {
    const clientSelect = document.getElementById('work_client');
    const dentistSelect = document.getElementById('work_dentist');
    const typeSelect = document.getElementById('work_type');
    const tooth = document.getElementById('tooth').value;
    const clientID = document.getElementById('client_ID').value;
    const pacientName = document.querySelector('#work_form input[placeholder="Nome do Paciente"]').value.trim();
    const typeID = document.getElementById('type_ID').value;
    const quantity = document.getElementById('quantity').value;
    const unitPrice = document.getElementById('unit').value;
    const total = document.getElementById('total').value;
    const date = document.getElementById('date').value;

    const workData = {
        data: 'work',
        id_client: clientID,
        client_name: clientSelect.options[clientSelect.selectedIndex]?.text || '',
        dentist: dentistSelect.options[dentistSelect.selectedIndex]?.text || '',
        pacient: pacientName,
        work_type_id: typeID,
        work_description: typeSelect.options[typeSelect.selectedIndex]?.text || '',
        tooth: tooth,
        quantity: quantity,
        unit_price: unitPrice,
        total_price: total,
        date: date
    };

    console.log(workData);
    window.pywebview.api.register.register(workData).then(response =>{
        alert(response)
    }).catch(err =>{
        console.error('Erro ao cadastrar trabalho: ', err)
    })
}
