package com.accountservice.account.config;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Service
public class RandomWordCombiner {

    private static final String DEFAULT_FILE_PATH = "words.txt";

    public String getCombinedRandomWord() {
        List<String> words = readWordsFromFile(DEFAULT_FILE_PATH);
        return getRandomCombinedWord(words);
    }

    private List<String> readWordsFromFile(String fileName) {
        List<String> words = new ArrayList<>();

        try {
            Path path = new ClassPathResource(fileName).getFile().toPath();
            words = Files.readAllLines(path);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return words;
    }

    private String getRandomCombinedWord(List<String> words) {
        Random random = new Random();
        String firstWord = words.get(random.nextInt(words.size()));
        String secondWord = words.get(random.nextInt(words.size()));
        return firstWord + secondWord;
    }
}