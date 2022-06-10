package com.oracle.helper;

import java.io.BufferedReader;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.CSVRecord;
import org.apache.commons.csv.QuoteMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.model.Return;
import com.oracle.model.ReturnItems;
import com.oracle.service.DataSourceConfigService;
import com.oracle.util.DateUtil;

@Service
public class CSVHelper {
	@Autowired
	private  DataSourceConfigService service;
	
	public static String TYPE = "text/csv";
	static String[] HEADERs = { "Employer", "Year", "Month", "SSN", "NRC", "Fname", "Lname", "DOB", "Total", "Employee",
			"Member" };

	public static boolean hasCSVFormat(MultipartFile file) {
		if (TYPE.equals(file.getContentType()) || file.getContentType().equals("application/vnd.ms-excel")) {
			return true;
		}

		return false;
	}

	public  List<ReturnItems> csvToRedturnList(InputStream is)  {
		try (BufferedReader fileReader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
				CSVParser csvParser = new CSVParser(fileReader,
						CSVFormat.DEFAULT.withFirstRecordAsHeader().withIgnoreHeaderCase().withTrim());) {

			List<ReturnItems> returnRecords = new ArrayList<>();
			
			//Return return1=new Return();
			//ReturnItems rItems=new ReturnItems();

			Iterable<CSVRecord> csvRecords = csvParser.getRecords();

			for (CSVRecord csvRecord : csvRecords) {
				Return return1=new Return();
				ReturnItems rItems=new ReturnItems();
				return1.setCompanyId(csvRecord.get(0));
				return1.setYear(Integer.parseInt(csvRecord.get(1)));
				return1.setMonth(Integer.parseInt(csvRecord.get(2)));
				return1.setTotalReturnAmount(Integer.parseInt(csvRecord.get(8)));
				return1.setReturnType("Normal");
				return1.setCreated(DateUtil.getCurrentDate());
				return1.setLastUpdated(DateUtil.getCurrentDate());
				//return1.setSubmissionNumber(Integer.parseInt (submissionNo));
				return1.setStatus("Open");
				
				rItems.setComapnyNumber(csvRecord.get(0));
				rItems.setMemberNrc(csvRecord.get(4));
				rItems.setMemFirstName(csvRecord.get(5));
				rItems.setMemeLastName(csvRecord.get(6));
				rItems.setYear(Integer.parseInt(csvRecord.get(1)));
				rItems.setMonth(Integer.parseInt(csvRecord.get(2)));
				rItems.setMemberDocNumber(csvRecord.get(10));
				String sDate1=csvRecord.get(7);  
				rItems.setMemberDob(DateUtil.convertStringToDate(sDate1));
				rItems.setRetur(return1);

				returnRecords.add(rItems);
			}

			return returnRecords;
		} catch (IOException e) {
			throw new RuntimeException("fail to parse CSV file: " + e.getMessage());
		}
	}
}
