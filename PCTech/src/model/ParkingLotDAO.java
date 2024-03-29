package model;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.jdbc.core.JdbcTemplate;

public class ParkingLotDAO {
	private static ApplicationContext applicationContext;
	private JdbcTemplate jdbcTemplate;
	private static final String SQL = "select * from parkingspot";
	
	static {
		applicationContext = new ClassPathXmlApplicationContext("remote-datasource.xml");
	}
	
	public static ParkingLotDAO createInstance(){
		return new ParkingLotDAO();
	}
	
	private void connectToDataSource(String parkingLotId){
		DataSource dataSource = (DataSource) applicationContext.getBean(parkingLotId);
		jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	/*@SuppressWarnings("unchecked")
	public void load(String parkingLotId,Map<String,ParkingSpot> parkingSpots){
		connectToDataSource(parkingLotId);
		List<Map<String,Object>> results = jdbcTemplate.queryForList(SQL);
		
		for(Map<String,Object> data : results){
			ParkingSpot ps = new ParkingSpot();
			ps.setId((String)data.get("id"));
			ps.setStatus((String)data.get("status"));
			ps.setEntranceTime((Date)data.get("entrancetime"));
			ps.setDepartureTime((Date)data.get("departuretime"));
			
			parkingSpots.put(ps.getId(),ps);
		}
	}*/
	
	@SuppressWarnings("unchecked")
	public void load(String parkingLotId,Set<ParkingSpot> parkingSpots){
		connectToDataSource(parkingLotId);
		List<Map<String,Object>> results = jdbcTemplate.queryForList(SQL);
		
		for(Map<String,Object> data : results){
			ParkingSpot ps = new ParkingSpot();
			ps.setId((String)data.get("id"));
			ps.setStatus((String)data.get("status"));
			ps.setEntranceTime((Date)data.get("entrancetime"));
			ps.setDepartureTime((Date)data.get("departuretime"));
			parkingSpots.add(ps);
		}
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}
	
}
