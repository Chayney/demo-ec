<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Item;
use App\Models\Profile;
use App\Models\Review;
use Faker\Generator as Faker;

class ReviewFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        do {
            $profileId = Profile::where('id', 1)->inRandomOrder()->first()->id;
            $itemId = Item::inRandomOrder()->first()->id;

            $exists = Review::where('profile_id', $profileId)
                ->where('item_id', $itemId)
                ->exists();
        } while ($exists);

        $faker = app(Faker::class);
        $reviews = [
            'お値下げ可能ですか。',
            'キズはありますか。',
            '購入希望です。',
            'どのくらい使用しましたか。',
            '他の写真も追加できますか。'
        ];

        return [
            'profile_id' => $profileId,
            'item_id' => $itemId,
            'review' => $faker->randomElement($reviews),
        ];
    }
}
