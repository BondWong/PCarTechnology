package model;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ParkingLots {
	private Map<String,ParkingLot> parkingLots;
	private ParkingLotsDAO parkingLotsDAO;
	
	public Map<String,ParkingLot> getParkingLots() {
		return parkingLots;
	}
	public void setParkingLots(Map<String,ParkingLot> parkingLots) {
		this.parkingLots = parkingLots;
	}
	public ParkingLotsDAO getParkingLotsDAO() {
		return parkingLotsDAO;
	}
	public void setParkingLotsDAO(ParkingLotsDAO parkingLotsDAO) {
		this.parkingLotsDAO = parkingLotsDAO;
	}
	
	public ParkingLot getParkingLot(String parkingLotId){
		return parkingLots.get(parkingLotId);
	}
	
	public void load(){
		parkingLotsDAO = ParkingLotsDAO.createInstance();
		parkingLots = new HashMap<String,ParkingLot>();
		
		List<Map<String,Object>> results = null;
		
		results = parkingLotsDAO.load();
		
		for(Map<String,Object> data : results){
			ParkingLot pl = new ParkingLot();
			
			pl.setAddress((String) data.get("address"));
			pl.setArchitecture((String) data.get("architecture"));
			pl.setBusinessHours((String)data.get("businessHours"));
			pl.setClient((String)data.get("client"));
			pl.setFacility((String)data.get("facility"));
			pl.setFee((String)data.get("fee"));
			pl.setJoinTime((Date)data.get("jointime"));
			pl.setLatitude((Float)data.get("latitude"));
			pl.setLongitude((Float)data.get("longitude"));
			pl.setName((String)data.get("name"));
			pl.setRemark((String)data.get("remark"));
			pl.setSpotQuantity((Integer)data.get("spotquantity"));
			
			parkingLots.put(pl.getName(),pl);
		}
	}
	
	public void saveParkingLot(ParkingLot parkingLot){
		Map<String,ParkingLot> pls = getParkingLots();
		pls.remove(parkingLot.getName());
		pls.put(parkingLot.getName(),parkingLot);
		setParkingLots(pls);
	}
	
}
