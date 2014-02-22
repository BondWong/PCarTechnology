package test;

import java.util.HashMap;
import java.util.Map;

//import model.ParkingLots;
import controller.HomePageController;
import junit.framework.TestCase;

public class HomePageProcessTestCase extends TestCase{
	private Map<String,Object> session;
	private HomePageController hpc;
	
	public void init(){
		session = new HashMap<String,Object>();
		hpc = new HomePageController();
		hpc.setSession(session);
	}
	
	public void testHomtPageProcess() throws Exception{
		init();
		//session.put("parkingLots",new ParkingLots());
		//hpc.setSession(session);
		
		hpc.execute();
	}
}
