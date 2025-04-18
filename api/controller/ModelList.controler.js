const ModelList = require("../../models/modellist.model"); // Đảm bảo model được định nghĩa đúng

const getProcTime = async (req, res) => {
    const query = req.query.query;
    const nameMatch = query.match(/name='(.+?)'/); // Trích xuất tên máy từ query
    if (nameMatch) {
      const machineName = nameMatch[1];
      
      // Giả sử dữ liệu ProcTime được lưu trong mảng modelList
      const modelList = await ModelList.findAll({
        attributes: ['Name', 'ProcTime'], // Lựa chọn chỉ những trường cần thiết
      });
      const machine = modelList.find((m) => m.Name === machineName);
      if (machine) {
        res.json(machine.ProcTime); // Gửi ProcTime về simulation
      } else {
        res.status(404).json({ error: 'Machine not found' });
      }
    } else {
      res.status(400).json({ error: 'Invalid query' });
    }
};

const updateProcTime = async (req, res) => {
  const { machineName, newProcTime } = req.body; // Lấy dữ liệu từ body

  console.log(machineName)
  if (!machineName || !newProcTime) {
      return res.status(400).json({ error: 'Machine name or new ProcTime is missing' });
  }

  try {
      // Tìm kiếm máy trong database
      const machine = await ModelList.findOne({
          where: { Name: machineName },
      });

      if (machine) {
          // Cập nhật ProcTime
          machine.ProcTime = newProcTime;
          await machine.save(); // Lưu thay đổi vào database
          res.json({ message: 'ProcTime updated successfully', machine });
      } else {
          res.status(404).json({ error: 'Machine not found' });
      }
  } catch (error) {
      console.error('Error updating ProcTime:', error);
      res.status(500).json({ error: 'An error occurred while updating ProcTime' });
  }
};

const getAllData = async (req, res) => {
  try {
      const data = await ModelList.findAll({
        attributes: ['Name', 'NameVNM', 'ProcTime', 'NumberProcessed', 'Failed', 'Simtime'], // Chỉ lấy các trường cần thiết
      });
      res.json(data); // Trả về dữ liệu dạng JSON
  } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
  }
};

const updateNumberProcessed = async (req, res) => {
  const { machineName } = req.query; // Lấy tên máy từ query

  if (!machineName) {
      return res.status(400).json({ error: 'Machine name is required' });
  }

  try {
      // Tìm kiếm máy trong cơ sở dữ liệu theo tên
      const machine = await ModelList.findOne({
          where: { Name: machineName },
      });

      if (machine) {
          // Cập nhật NumberProcessed
          machine.NumberProcessed += 1; // Tăng giá trị NumberProcessed lên 1
          await machine.save(); // Lưu thay đổi vào cơ sở dữ liệu

          res.json({ message: `NumberProcessed for ${machineName} updated successfully`, machine });
      } else {
          res.status(404).json({ error: 'Machine not found' });
      }
  } catch (error) {
      console.error('Error updating NumberProcessed:', error);
      res.status(500).json({ error: 'An error occurred while updating NumberProcessed' });
  }
};

const updateNumberProcessedTo0 = async (req, res) => {
    const { machineName } = req.query; // Lấy tên máy từ query
  
    if (!machineName) {
        return res.status(400).json({ error: 'Machine name is required' });
    }
  
    try {
        // Tìm kiếm máy trong cơ sở dữ liệu theo tên
        const machine = await ModelList.findOne({
            where: { Name: machineName },
        });
  
        if (machine) {
            // Cập nhật NumberProcessed
            machine.NumberProcessed = 0; // Tăng giá trị NumberProcessed lên 1
            await machine.save(); // Lưu thay đổi vào cơ sở dữ liệu
  
            res.json({ message: `NumberProcessed for ${machineName} updated successfully`, machine });
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        console.error('Error updating NumberProcessed:', error);
        res.status(500).json({ error: 'An error occurred while updating NumberProcessed' });
    }
  };

const resetNumberProcessed = async (req, res) => {
    try {
        await ModelList.update({ NumberProcessed: 0, Failed: 0, Simtime: 0 }, { where: {} }); // Cập nhật tất cả máy về 0
        res.json({ message: "All NumberProcessed values have been reset to 0" });
    } catch (error) {
        console.error("Error resetting NumberProcessed:", error);
        res.status(500).json({ error: "An error occurred while resetting NumberProcessed" });
    }
};

const updateNumberFailed = async (req, res) => {
    const { machineName } = req.query; // Lấy tên máy từ query

    if (!machineName) {
        return res.status(400).json({ error: 'Machine name is required' });
    }

    try {
        // Tìm kiếm máy theo tên
        const machine = await ModelList.findOne({
            where: { Name: machineName },
        });

        if (machine) {
            // Tăng giá trị `Failed` lên 1
            machine.Failed += 1;
            await machine.save(); // Lưu thay đổi vào database

            res.json({ message: `NumberFailed for ${machineName} updated successfully`, machine });
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        console.error('Error updating NumberFailed:', error);
        res.status(500).json({ error: 'An error occurred while updating NumberFailed' });
    }
};

const decreaseFailedCount = async (req, res) => {
    const { machineName } = req.query; // Lấy tên máy từ query

    if (!machineName) {
        return res.status(400).json({ error: 'Machine name is required' });
    }

    try {
        // Tìm kiếm máy theo tên
        const machine = await ModelList.findOne({
            where: { Name: machineName },
        });

        if (machine) {
            if (machine.Failed > 0) {
                // Giảm giá trị `Failed` đi 1 nếu lớn hơn 0
                machine.Failed -= 1;
                await machine.save(); // Lưu thay đổi vào database
                res.json({ message: `NumberFailed for ${machineName} decreased successfully`, machine });
            } else {
                res.status(400).json({ error: `No failed products to decrease for ${machineName}` });
            }
        } else {
            res.status(404).json({ error: 'Machine not found' });
        }
    } catch (error) {
        console.error('Error decreasing NumberFailed:', error);
        res.status(500).json({ error: 'An error occurred while decreasing NumberFailed' });
    }
};

let TotalSimTime = 0;

const updateSimTimeFromQuery = async (req, res) => {
    try {
        const simtimeParam = req.query.simtime;
        if (!simtimeParam) {
            return res.status(400).json({ error: "simtime parameter is required" });
        }
        
        // Chuyển giá trị nhận được sang số thực
        const newSimTime = parseFloat(simtimeParam);
        if (isNaN(newSimTime)) {
            return res.status(400).json({ error: "Invalid simtime value" });
        }
        
        // Cập nhật cột simtime cho tất cả các bản ghi trong bảng modellist
        await ModelList.update({ Simtime: newSimTime }, { where: {} });
        
        TotalSimTime = newSimTime;
        console.log(`SimTime updated in all records: ${TotalSimTime}`);
        return res.json({ message: "SimTime updated successfully in all records", TotalSimTime });
    } catch (error) {
        console.error("Error updating SimTime:", error);
        return res.status(500).json({ error: "An error occurred while updating SimTime" });
    }
};

const getSimTime = async (req, res) => {
    try {
        // Kiểm tra xem có query không
        const query = req.query.query;
        const match = query && query.match(/select Simtime from modellist/i);

        if (!match) {
            return res.status(400).send("Invalid query");
        }

        // Truy vấn giá trị Simtime từ ModelList
        const record = await ModelList.findOne({
            attributes: ['Simtime'],
        });

        if (!record) {
            return res.status(404).send("0"); // Trả về 0 nếu không có dữ liệu
        }

        res.json(record.Simtime); // Trả về giá trị Simtime dưới dạng chuỗi
    } catch (error) {
        console.error("Error fetching Simtime:", error);
        res.status(500).send("0"); // Trả về 0 nếu có lỗi xảy ra
    }
};

module.exports = { getProcTime, updateProcTime, getAllData, updateNumberProcessed, 
    resetNumberProcessed, updateNumberProcessedTo0, updateNumberFailed, decreaseFailedCount,
    updateSimTimeFromQuery, getSimTime  };