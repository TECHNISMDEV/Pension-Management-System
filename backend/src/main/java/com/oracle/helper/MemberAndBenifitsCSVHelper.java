package com.oracle.helper;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormatter;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;

import com.oracle.Vos.BenificiaryVo;
import com.oracle.Vos.MemberVO;
import com.oracle.model.Benificiary;
import com.oracle.model.Member;
import com.oracle.util.DateUtil;

public class MemberAndBenifitsCSVHelper {
	
	
	public static String TYPE = "text/csv";
	static String[] HEADERs = { "Employer", "Year", "Month", "SSN", "NRC", "Fname", "Lname", "DOB", "Total", "Employee",
			"Member" };

	public static boolean hasExcelFormat(MultipartFile file) {
		if (TYPE.equals(file.getContentType()) || file.getContentType().equals("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
			return true;
		}

		return false;
	}

	public List<MemberVO> excelToMemberList(InputStream is) {
		Workbook excelWorkBook = null;
		try {
			excelWorkBook = new XSSFWorkbook(is);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		Sheet memberSheet = excelWorkBook.getSheetAt(0);
		Sheet benificiarySheet = excelWorkBook.getSheetAt(1);

		List<MemberVO> memberList = extractMemberData(memberSheet);		
		List<BenificiaryVo> memberBenficiaryList = extractMemberBenificiaryData(benificiarySheet);
		
		
		for(MemberVO mem:memberList) {
			for(BenificiaryVo bVo:memberBenficiaryList) {
				if(mem.getNrc().equals(bVo.getMemberNrc()) )
				{
					mem.getBenificiaryVo().add(bVo);
				}
			}
		}

		return memberList;

	}

	private List<BenificiaryVo> extractMemberBenificiaryData(Sheet sheet) {


		Iterator<Row> rows = sheet.iterator();

		List<BenificiaryVo> lstMember = new ArrayList<BenificiaryVo>();

		int rowNumber = 0;
		while (rows.hasNext()) {
			Row currentRow = rows.next();

			// skip header
			if (rowNumber == 0) {
				rowNumber++;
				continue;
			}

			Iterator<Cell> cellsInRow = currentRow.iterator();

			BenificiaryVo cust = new BenificiaryVo();

			int cellIndex = 0;
			while (cellsInRow.hasNext()) {
				Cell currentCell = cellsInRow.next();

				if (cellIndex == 0) { // FNAME
					cust.setFirstName(currentCell.getStringCellValue());
				} else if (cellIndex == 1) { // MIDDLEName
					cust.setMiddleName(currentCell.getStringCellValue());
				} else if (cellIndex == 2) { // LastName
					cust.setLastName(currentCell.getStringCellValue());
				} else if (cellIndex == 3) { // DOB
					cust.setDob(currentCell.getDateCellValue());
				} else if (cellIndex == 4) { // DOCUMENT_NUM
					cust.setDocumaentName(Double.toString(currentCell.getNumericCellValue()));
				} else if (cellIndex == 5) { // DOCUMENT_TYPE
					cust.setDocumentType(currentCell.getStringCellValue());
				} else if (cellIndex == 6) { // SSN
					cust.setSsn(Double.toString(currentCell.getNumericCellValue()));
				} else if (cellIndex == 7) { // NRC
					cust.setNrc(currentCell.getStringCellValue());
				} else if (cellIndex == 8) { // EMAIL
					cust.setEmail(currentCell.getStringCellValue());
				} else if (cellIndex == 9) { // MOB
					cust.setMobile(Double.valueOf(currentCell.getNumericCellValue()).longValue());
				} else if (cellIndex == 10) { // NATIONALITY
					cust.setNationality(currentCell.getStringCellValue());
				}else if (cellIndex == 11) { // Member_NRC
					cust.setMemberNrc(currentCell.getStringCellValue());
				}else if (cellIndex == 12) { // Member_DOB
					cust.setMemberDob(currentCell.getDateCellValue());
				}

				cellIndex++;
			}

			lstMember.add(cust);
		}
		return lstMember;

	
	}

	private List<MemberVO> extractMemberData(Sheet sheet) {

		Iterator<Row> rows = sheet.iterator();

		List<MemberVO> lstMember = new ArrayList<MemberVO>();

		int rowNumber = 0;
		while (rows.hasNext()) {
			Row currentRow = rows.next();

			// skip header
			if (rowNumber == 0) {
				rowNumber++;
				continue;
			}

			Iterator<Cell> cellsInRow = currentRow.iterator();

			
			DataFormatter formatter = new DataFormatter(Locale.US);

			int cellIndex = 0;
			MemberVO cust = new MemberVO();
			while (cellsInRow.hasNext()) {
				Cell currentCell = cellsInRow.next();

				if (cellIndex == 0) { // FNAME
					cust.setFirstName(currentCell.getStringCellValue());
				} else if (cellIndex == 1) {
					// MIDDLEName
					cust.setMiddleName(currentCell.getStringCellValue());
				}
				else if (cellIndex == 2) {// LastName
					cust.setLastName(currentCell.getStringCellValue());
				} else if (cellIndex == 3) { // DOB
					cust.setDob(currentCell.getDateCellValue());
				} else if (cellIndex == 4) { // DOCUMENT_NUM
					cust.setDocumaentName(Double.toString(currentCell.getNumericCellValue()));
				} else if (cellIndex == 5) { // DOCUMENT_TYPE
					cust.setDocumentType(currentCell.getStringCellValue());
				} else if (cellIndex == 6) { // SSN
					cust.setSsn(Double.toString(currentCell.getNumericCellValue()));
				} else if(cellIndex == 7) { // NRC
					cust.setNrc(currentCell.getStringCellValue());
				}else if (cellIndex == 8) { // EMAIL
					cust.setEmail(currentCell.getStringCellValue());
				} else if (cellIndex == 9) {// MOB
					cust.setMobile(Double.valueOf(currentCell.getNumericCellValue()).longValue());
				} else if (cellIndex == 10) { // RETIREMENT_DT
					cust.setRetirmentDate(currentCell.getDateCellValue());
				} else if (cellIndex == 11) { // DOD
					cust.setDod(currentCell.getDateCellValue());
				} else if (cellIndex == 12) { // NATIONALITY
					cust.setNationality(currentCell.getStringCellValue());
				}else if (cellIndex == 13) { // NATIONALITY
					cust.setCompanyId(currentCell.getStringCellValue());
				}

				cellIndex++;
			}
			lstMember.add(cust);
			
		}
		return lstMember;

	}


}
