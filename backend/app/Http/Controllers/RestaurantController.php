<?php

namespace App\Http\Controllers;

use App\Models\SearchCache;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class RestaurantController extends Controller
{
    public function search(Request $request) {

        $keyword = trim(strtolower($request->query('keyword', 'Bang Sue'))); //รับค่า keyword

        //เช็กว่า keyword เคยมีใน cache รึเปล่า
        $searchCache = SearchCache::where('keyword',$keyword)->first();

        //ถ้าเจอใน cahce >>> ใช้ค่าใน cache
        if($searchCache){
            return response()->json([
                'success' => true,
                'msg' => 'success',
                'source' => 'database_cache',
                'data' => $searchCache->results
            ]);
        }

        //กรณีไม่เจอ >>> เรียกจาก mock API json
        $jsonPath = file_get_contents(database_path('data/restaurants.json'));
        if (!$jsonPath) {
            return response()->json(['success' => false, 'msg' => 'Data file not found'], 404);
        }
    
        $data = json_decode($jsonPath, true);
        $searchResult = [];

        //เช็กว่า keyword ตรงกับชื่อเขตหรือชื่อร้านรึเปล่า >>> ถ้าตรง เอาใส่ searchResult
        foreach ($data['restaurants'] as $value) {
            if (str_contains(strtolower($value['district']), $keyword) || 
                    str_contains(strtolower($value['name']), $keyword) ) {

                $searchResult[] = $value;

            }
        }

        //บันทึกข้อมูลลง search_caches
        SearchCache::create(['keyword' => $keyword, 'results' => $searchResult]);

        return response()->json([
                'success' => true,
                'msg' => 'success',
                'source' => 'mock_api_json',
                'data' => $searchResult
            ]);

    }
}
