package com.fitness.backend.storage;

// import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Component
public class JsonStorage {

    private static String getDataPath() {
    File f = new File("data");
    if (f.exists()) return "data" + File.separator;
    
    File f2 = new File("backend/data");
    if (f2.exists()) return "backend" + File.separator + "data" + File.separator;
    
    File f3 = new File("../data");
    if (f3.exists()) return ".." + File.separator + "data" + File.separator;
    
    return "data" + File.separator;
    }
    
    private static final ObjectMapper mapper = new ObjectMapper();

    public static <T> List<T> read(String fileName, Class<T> clazz) {
        File file = new File(getDataPath() + fileName + ".json");
        System.out.println("Caut fisierul la: " + file.getAbsolutePath());
        if (!file.exists()) return new ArrayList<>();
        try {
            return mapper.readValue(file,
                mapper.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public static <T> void write(String fileName, List<T> data) {
        File file = new File(getDataPath() + fileName + ".json");
        try {
            mapper.writerWithDefaultPrettyPrinter().writeValue(file, data);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public static int nextId(List<?> data) {
        if (data.isEmpty()) return 1;
        return data.stream()
                .mapToInt(obj -> {
                    try {
                        var field = obj.getClass().getDeclaredField("id");
                        field.setAccessible(true);
                        return (int) field.get(obj);
                    } catch (Exception e) {
                        return 0;
                    }
                })
                .max()
                .orElse(0) + 1;
    }
}