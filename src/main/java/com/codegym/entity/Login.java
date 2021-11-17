package com.codegym.entity;

public class Login {
    private String username;
    private String password;

    public Login() {
    }

    public Login(String userName, String passWord) {
        this.username = userName;
        this.password = passWord;
    }

    public String getUserName() {
        return username;
    }

    public void setUserName(String userName) {
        this.username = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
