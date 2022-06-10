package com.oracle.service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;



@Component
public class DataSourceConfigService {
	
	
	@Value("${oracle.service.url}")
    private String url;
	
	@Value("${spring.datasource.username}")
	private String username;
	@Value("${spring.datasource.password}")
	private String password;

    public Connection getConnection(String usr, String pass) {
      
    	Connection conn = null;
    	try {
			 conn = DriverManager.getConnection(url, usr, pass);
		} catch (SQLException e) {
			e.printStackTrace();
		}


        return conn;
    }
    public  String generatedValue(String sequenceName,String prefix)
	 {
    	String suffix="";
    	String sql="select "+sequenceName+".nextval from dual";
		Connection con=getConnection(username,password);
		 try {
			PreparedStatement stmt=con.prepareStatement(sql);
			stmt.execute();
			ResultSet rs=stmt.getResultSet();
			if(rs.next())
			{
				Integer num=rs.getInt(1);
				suffix=String.valueOf(num);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 
		 return prefix+suffix;
		 
	 }
}
