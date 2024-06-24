"use strict"
// API rest
const url = "https://6674aead75872d0e0a974098.mockapi.io/api/BurguerQueen/sucursales"; // url de mockapi

document.querySelector("#btnAgregarForm").addEventListener("click", agregar); //boton para llamar a la funcion agregar

async function modificar(event){
    const id = event.target.getAttribute("data-id"); // leo el id de cada fila
    let sucursal = document.querySelector("#formsucursal").value;
    let localidad = document.querySelector("#formlocalidad").value;
    let direccion = document.querySelector("#formdireccion").value;
    let horario = document.querySelector("#formhorario").value;
    if(sucursal==" "||localidad==" "||direccion==""||horario==""){ // if para requerir el llenado de todos los campos
        document.querySelector("#mensaje").innerHTML = "**Complete todos los campos del Formulario**";
    }
        else{ 
        let usuario = {
            "sucursales": sucursal,
            "localidad": localidad,
            "direccion": direccion,
            "horario": horario
        };
        try {
            let res = await fetch(url+"/"+ id, {
                "method": "PUT",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(usuario)
            });
            if (res.status === 200) {
                document.querySelector("#mensaje").innerHTML = "Modificado!";
                obtenerDatos(); // Vuelvo a llamar a la funcion para tener siempre actualizada la tabla
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function borrar(event){
    const id = event.target.getAttribute("data-id");
    console.log("entro" + id); // para probar que entra a la funcion y lee el id
    try {
        let res = await fetch(url + "/" + id, {
            "method": "DELETE",
        });
        if (res.status === 200) {
            document.querySelector("#mensaje").innerHTML = "Eliminado!";
            obtenerDatos(); // Refrescar la tabla después de borrar
        }
    } catch (error) {
        console.log(error);
    }
}

async function agregar() {
    let sucursal = document.querySelector("#formsucursal").value;
    let localidad = document.querySelector("#formlocalidad").value;
    let direccion = document.querySelector("#formdireccion").value;
    let horario = document.querySelector("#formhorario").value;
    if(sucursal==" "||localidad==" "||direccion==""||horario==""){
        document.querySelector("#mensaje").innerHTML = "**Complete todos los campos del formulario**";
    }
    else{
            let sucursales = {
                "sucursales": sucursal,
                "localidad": localidad,
                "direccion": direccion,
                "horario": horario
            };
        try {
            let res = await fetch(url, {
                "method": "POST",
                "headers": { "Content-type": "application/json" },
                "body": JSON.stringify(sucursales)
            });
            if (res.status === 201) {
                document.querySelector("#mensaje").innerHTML = "Creado!";
                obtenerDatos(); // Refrescar la lista después de agregar
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function obtenerDatos(){
    const lista = document.querySelector("#lista-sucursales");
    lista.innerHTML = "";
    try {
        let res = await fetch(url);
        let json = await res.json();
        console.log(json);
        for (const sucursales of json) {
            let sucursal = sucursales.sucursales;
            let localidad = sucursales.localidad;
            let direccion = sucursales.direccion;
            let horario = sucursales.horario;
            let id = sucursales.id;
            console.log(id);
            lista.innerHTML +=  
            `<tr>
                <td>${sucursal}</td>
                <td>${localidad}</td>
                <td>${direccion}</td>
                <td>${horario}</td>
                <td>
                    <button type="button" class="btn-eliminar btn-table styled-button" data-id="${id}">X</button>
                    <button type="button" class="btn-modificar btn-table styled-button" data-id="${id}">Edit</button>
                </td>
            </tr>`;
        }
        // Asignar los event listeners después de que el HTML esté completamente cargado
        let btnEliminar = document.querySelectorAll(".btn-eliminar");
        btnEliminar.forEach(btn => { btn.addEventListener("click", borrar); });

        let btnModificar = document.querySelectorAll(".btn-modificar");
        btnModificar.forEach(btn => { btn.addEventListener("click", modificar); });
        
    } catch (error) {
        console.log(error);
    }
}

obtenerDatos()