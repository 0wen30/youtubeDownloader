const info = document.getElementById('info');
const opciones = document.getElementById('opciones');

const crearElemento = (tag, texto, clases) => {
    const el = document.createElement(tag);
    el.textContent = texto;
    return el;    
}

document.getElementById('btn').addEventListener('click', async() => {
    const url = document.getElementById('url').value;
    const {
        titulo,
        autor,
        length,
        views,
        fecha,
        formatos
    } = await electronAPI.obtenerInfoUrl(url);
    info.appendChild(crearElemento('h2', titulo));
    info.appendChild(crearElemento('h3', autor));
    info.appendChild(crearElemento('p', length));
    info.appendChild(crearElemento('p', views));
    info.appendChild(crearElemento('p', fecha));
    formatos.forEach(formato => {
        const qualityLabel = crearElemento('li', formato.qualityLabel);
        opciones.appendChild(qualityLabel);
        qualityLabel.addEventListener('click', async() => await electronAPI.descargar({formato, url}));
    });
});
