package test;

import java.util.HashMap;
import java.util.Map;

import controller.ParkingLotDataController;
import model.ParkingLot;
import model.ParkingLots;
import junit.framework.TestCase;

public class ParkingLotDataControllerProcessTestCase extends TestCase{
	private ParkingLotDataController splc;
	private Map<String,Object> session;
	private Map<String,String[]> parameters;
	
	public void init(){
		splc = new ParkingLotDataController();
		session = new HashMap<String,Object>();
		parameters = new HashMap<String,String[]>();
		parameters.put("parkingLotName",new String[]{"xxxparkinglot"});
		parameters.put("requestDataType",new String[]{"parkingLotInfo"});
		splc.setSession(session);
		splc.setRequestDataType("parkingLotInfo");
		splc.setParkingLotID("1");
	}
	
	public void testSelectParkingLotProcess1() throws Exception{
		init();
		
		String result = splc.execute();
		System.out.println("result: "+result);
	}
	
	public void testSelectParkingLotProcess2() throws Exception{
		init();
		ParkingLots pls = new ParkingLots();
		ParkingLot pl = new ParkingLot();
		pl.setName("xxxparkinglot");
		Map<String,ParkingLot> m = new HashMap<String,ParkingLot>();
		m.put(pl.getName(),pl);
		pls.setParkingLots(m);
		session.put("parkingLots",pls);
		
		String result = splc.execute();
		System.out.println("result: "+result);
	}
}
