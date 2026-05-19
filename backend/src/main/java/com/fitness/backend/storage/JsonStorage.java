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

    private static final String DATA_PATH = System.getProperty("user.dir") 
    + File.separator + "data" 
    + File.separator;
    
    private static final ObjectMapper mapper = new ObjectMapper();

    public static <T> List<T> read(String fileName, Class<T> clazz) {
        File file = new File(DATA_PATH + fileName + ".json");
        if (!file.exists()) return new ArrayList<>();
        try {
            return mapper.readValue(file,
                mapper.getTypeFactory().constructCollectionType(List.class, clazz));
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }

    public static <T> void write(String fileName, List<T> data) {
        File file = new File(DATA_PATH + fileName + ".json");
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