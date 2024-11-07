import { decode } from "base64-arraybuffer";
import { supabase } from "./supabase"
import * as FileSystem from 'expo-file-system';

export const getData = async (table) => {
    try {
        const { data, error } = await supabase.from(table).select();
        if (error) throw error;
        return { data, error };
    } catch (error) {
        console.error('Error en getData:', error);
        return { data: null, error };
    }
}

export const getDataById = async (table, id) => {
    try {
        const { data, error } = await supabase.from(table).select().eq('id', id);
        if (error) throw error;
        return { data, error };
    } catch (error) {
        console.error('Error en getDataById:', error);
        return { data: null, error };
    }
}

export const insertData = async (table, data) => {
    try {
        const { error } = await supabase.from(table).insert(data)
        if (error) throw error
    } catch (error) {
        console.error('Error en insertData:', error)
    }
}

export const updateData = async (table, data) => {
    try {
        const { error } = await supabase.from(table).update(data).match({ id: data.id })
        if (error) throw error

    } catch (error) {
        console.error('Error en updateData:', error)
    }
}

export const deleteData = async (table, id) => {
    try {
        const { error } = await supabase.from(table).delete().match({ id })
        if (error) throw error
    } catch (error) {
        console.error('Error en deleteData:', error)
    }
}

export const uploadImages = async (imageUri) => {
    if (!imageUri) {
        console.error("No se ha seleccionado ninguna imagen");
        return null;
    }

    const base64 = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });
    const filePath = `${new Date().getTime()}.${imageUri.split('.').pop()}`;
    const contentType = imageUri.split('.').pop() === 'png' ? 'image/png' : 'image/jpeg';

    console.log("Subiendo imageeeeeen:", filePath);

    // Subir la imagen a Supabase
    const { data, error } = await supabase.storage.from('avatars').upload(filePath, decode(base64), { contentType });

    if (error) {
        console.error("Error subiendo la imagen a Supabase:", error);
        return null;
    }

    console.log("Imagen subida con éxito:", data);
    return "https://uljehxrgvceskyxjlnqs.supabase.co/storage/v1/object/public/avatars/"+data.path;
};