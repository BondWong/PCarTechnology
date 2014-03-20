package test;

import java.util.HashMap;
import java.util.Map;

import controller.GetParkingLotsController;
import model.ParkingLots;
import junit.framework.TestCase;

public class GetParkingLotsProcessTestCase extends TestCase{
	private Map<String,Object> session;
	private GetParkingLotsController hpc;
	private ParkingLots parkingLots;
	
	public void init(){
		parkingLots = new ParkingLots();
		//parkingLots.getParkingLots().put("xxxparkinglot",new ParkingLot());
		//parkingLots.getParkingLots().put("yyyparkinglot",new ParkingLot());
		
		session = new HashMap<String,Object>();
		session.put("parkingLots",parkingLots);
		
		hpc = new GetParkingLotsController();
		hpc.setSession(session);
	}
	
	public void testHomtPageProcess() throws Exception{
		init();
		
		hpc.execute();
		
		System.out.println(hpc.getNecessaryData());
	}
}
