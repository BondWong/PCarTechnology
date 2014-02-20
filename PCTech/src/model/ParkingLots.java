package model;

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
		
	}
	
	public void saveParkingLot(ParkingLot parkingLot){
		Map<String,ParkingLot> pls = getParkingLots();
		pls.remove(parkingLot.getId());
		pls.put(parkingLot.getId(),parkingLot);
		setParkingLots(pls);
	}
	
}
